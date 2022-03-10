import React, {useRef,useState} from "react";
import { useHistory } from "react-router-dom";
import Alert from '@mui/material/Alert';
import axiosInstance from "AxiosInstance";


export default function Register() {
  const emailRef = useRef()
  const uidRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    if(emailRef.current.value===''){
      return setError("Enter a valid S.P.I.T Mail ID !")
    }
    if(uidRef.current.value===''){
      return setError("Enter your valid S.P.I.T UID !")
    }
    
    if(passwordRef.current.value===''){
      return setError("Password Required !")
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

      setError("")
      setLoading(true)
      // axios post request code
      sessionStorage.setItem("email",emailRef.current.value)
      sessionStorage.setItem("uid",uidRef.current.value)
      sessionStorage.setItem("password",passwordRef.current.value)

      axiosInstance.post('profile/',{email:emailRef.current.value,uid:uidRef.current.value}).then((res)=>{
        setError(res.data);
        if(res.data[0]==="F"){
          history.push("/profileform")
        }
        else{
          sessionStorage.removeItem("email",emailRef.current.value)
          sessionStorage.removeItem("uid",uidRef.current.value)
          sessionStorage.removeItem("password",passwordRef.current.value)
        }
      })
    setLoading(false)
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with Credentials
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  {error && <Alert severity="error">{error}</Alert>}
                  
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      ref={emailRef}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                    S.P.I.T UID 
                    </label>
                    <input
                      type="number"
                      ref={uidRef}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="S.P.I.T UID"
                    />
                  </div>


                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      ref={passwordRef}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      ref={passwordConfirmRef}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>

                 

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit" disabled={loading}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
