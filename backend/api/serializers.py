from rest_framework.serializers import ModelSerializer
from .models import Profile,Contacts

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ContactSerializer(ModelSerializer):
    class Meta:
        model = Contacts
        fields = '__all__'
