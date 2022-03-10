from functools import partial
import re,jwt
from urllib import response
from datetime import datetime,timedelta
from django.middleware import csrf
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import Event, Profile, Project
from api.serializers import ProfileSerializer,ContactSerializer
from backend.settings import SIMPLE_JWT
from django.contrib.auth.hashers import check_password, make_password
# from backendapi.models import Company, CompanyQuestion, Event, Profile, Question, QuestionAnswer
# from backendapi.serializers import CompanyQuestionSerializer, CompanySerializer, EventSerializer, ProfileSerializer, QuestionAnswerSerializer, QuestionSerializer
from django.db import connection 

def query(q) :#function to execute raw sql query
    with connection.cursor() as c:
        c.execute(q)
        if q[0:6].lower()=="select":
            return dictfetchall(c) # returns result of query only if it a select query
        else :
            return "success"

def dictfetchall(cursor):#dependency for query function
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

class LoginView(APIView):

    def post(self, request, format=None):
        data = request.data
        response = Response()       
        print(data)
        email = data.get('email', None)
        preProfile = query(F"select * from api_profile where email='{email}'")
        
        if not preProfile:
            return Response("Invalid credentials")

        if not check_password(data.get('password',None),preProfile[0]['password']):
            return Response("Invalid credentials")
            
        token = jwt.encode({'email':email,'exp': datetime.now() + timedelta(days=1)},SIMPLE_JWT['SIGNING_KEY'],algorithm=SIMPLE_JWT['ALGORITHM'])
        response.set_cookie(
            key = SIMPLE_JWT['AUTH_COOKIE'], 
            value = token,
            expires = SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure = SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly = SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite = SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        csrf.get_token(request)
        response.data = "Success"
        return response

class ProfileView(APIView):

    def get(self,req,format=None):
        token = req.COOKIES['access_token']
        decoded_token = jwt.decode(token,SIMPLE_JWT['SIGNING_KEY'],algorithms=SIMPLE_JWT['ALGORITHM'])
        email = decoded_token['email']
        preProfile = query(F"select * from api_profile where email='{email}'")[0]
        preProfile['password'] = None
        # preProfile['social']=[preProfile.get('linkedInProfile'),preProfile.get('githubProfile'),preProfile.get('otherLinks')]
        # preProfile['workExperience'] = preProfile['workExperience'].split(",")
        if not preProfile:
            return Response("Invalid token or credentials")
        return Response(preProfile)

    def post(self,req,format=None):
        print(req.data)
        data = req.data.copy()
        email = data.get('email',None)
        uid = data.get('uid',None)    
        print(data)   
        preProfile = query(f"select * from api_profile where email='{email}' or uid='{uid}'")
        if not data.get('uid',None) or len(data.get('uid',None))!=10:
            return Response("Valid S.P.I.T UID is required")
        if not data['email'] or len(data['email'])<=5 or not re.match(r"^[A-Za-z0-9._%+-]+@spit.ac.in$",data['email']) : #check email validations
            return Response("S.P.I.T email ID is required!")
        if preProfile :
            return Response("User already registered!")

        if not data.get('password',None):
            return Response("Fill complete profile!")
            
        if not (data.get('githubProfile') or data.get('linkedInProfile') or data.get('otherLinks')):
            return Response("Atleast 1 Profile Link is required!")

        if not data.get('skills',None):
            return Response("Atleast enter 1 skill!")
        
        if ((data.get('pcompany1') and not data.get('prole1')) or (data.get('pcompany2') and not data.get('prole2')) or (data.get('pcompany3') and not data.get('prole3')) or (data.get('currentCompany') and not data.get('role'))):
            return Response("A corresponding Role field is incomplete!")


        data['password'] = make_password(data['password'])    
        Serializer = ProfileSerializer(data=data,partial=True)
        if Serializer.is_valid():
            Serializer.save()
            return Response("Profile created successfully")
        else :
            return Response("Some error occured")
        
class UpdateProfileView(APIView):

    def post(self,req,format=None):
        print(req.data)
        data=req.data.copy()
        token = req.COOKIES['access_token']
        decoded_token = jwt.decode(token,SIMPLE_JWT['SIGNING_KEY'],algorithms=SIMPLE_JWT['ALGORITHM'])
        email = decoded_token['email']
        if ((data.get('pcompany1') and not data.get('prole1')) or (data.get('pcompany2') and not data.get('prole2')) or (data.get('pcompany3') and not data.get('prole3')) or (data.get('currentCompany') and not data.get('role'))):
            return Response("A corresponding Role field is incomplete!")
        preProfile = Profile.objects.filter(email=email).first()
        serializer = ProfileSerializer(preProfile,data=req.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response("Profile updated successfully")
        else:
            return Response("Some error occured")      

class EventView(APIView):
    def get(self,request,pk=None,format=None):
        if pk=="all":
            return Response(query(f"select * from api_event order by date desc"))    
        else:
            return Response(query(f"select * from api_event where id='{pk}'"))

class ProjectView(APIView):
    def get(self,request,pk,format=None):
        allProjects = query(f"select * from api_project where id='{pk}'")
        if pk=="all":
            allProjects = query(f"select * from api_project")
        return Response(allProjects)        

class CompanyView(APIView):
    # "all" to get all CompanyQuestion 
    # Positive number to get CompanyQuestion by id
    # "tech-nontech" to get only company name sorted by tech and non tech
    def get(self,req,pk,format=None):
        if pk=="tech-nontech":
            techCompanies = query(f"select id,name from api_company where tech=True")          
            nonTechCompanies = query(f"select id,name from api_company where tech=False")
            allCompanies = {"tech":techCompanies,"nonTech":nonTechCompanies}   
            return Response(allCompanies)
        if pk=="all":
            allCompanies = query(f"select * from api_company")
            return Response(allCompanies)
        else:              
            company = query(f"select * from api_company where id='{pk}'")
            return Response(company)

class QuestionView(APIView):
    def get(self,req,pk,format=None):
        allQuestions = query(f"select api_question.id as question_id,* from api_question join api_company where company_id='{pk}' and api_company.id=api_question.company_id")
        print(allQuestions)
        return Response(allQuestions)  

class AnswerView(APIView):
    def get(self,req,pk,format=None):
        answer = query(f"select * from api_answer where question_id='{pk}'")
        return Response(answer)  

class LogoutView(APIView):
    def post(self,req,format=None):
        response = Response()
        response.delete_cookie("access_token")
        response.data = "Success"
        return response

class VerifyView(APIView):
    def post(self,req,format=None):
        token = req.COOKIES['access_token']
        if token :
            return Response("True")
        return Response("False")

class NetworkView(APIView):
    def get(self,req,pk,format=None):
        if pk=="get-years":
            result = query(f"select passoutYear from api_profile group by passoutYear")       
        elif pk=="get-branch":
            result = query(f"select branch from api_profile group by branch")
        else:
            result = query(f"select profilePic,name,branch,skills,currentCompany,githubProfile,linkedInProfile,otherLinks from api_profile where passoutYear='{pk}'")
            if result==[]:
                return Response("")
        return Response(result)

class BranchView(APIView):
    def get(self,req,pk,format=None):
        result = query(f"select profilePic,name,branch,skills,currentCompany,githubProfile,linkedInProfile,otherLinks from api_profile where branch='{pk}'")
        if result==[]:
            return Response("")
        return Response(result)

class BranchYearView(APIView):
    def post(self,req,format=None):
        print(req.data['branch'])
        result = query(f"select profilePic,name,branch,skills,currentCompany,githubProfile,linkedInProfile,otherLinks from api_profile where branch='{req.data['branch']}' and passoutYear={req.data['year']}")
        if result==[]:
            return Response("")
        return Response(result)

class ContactView(APIView):
    def post(self,req,format=None):
        # print()
        # print(req.data['name'],req.data['email'],req.data['message'])
        # print()
        Serializer = ContactSerializer(data=req.data)
        if Serializer.is_valid():
            Serializer.save()
            return Response("Message saved successfully")
        else :
            return Response("Some error occured")
        return Response("Serializer not valid!")

            

            