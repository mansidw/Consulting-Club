import React,{useRef,useState} from "react";
import { Link,useHistory } from "react-router-dom";
import imge1 from "../assets/img/screen.gif"
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from "../AxiosInstance"

// components
//BBE1FA
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Landing() {
  const history = useHistory()
  const nameRef = useRef()
  const emailRef = useRef()
  const messageRef = useRef()

  const spanstyle={
    fontWeight:'bold',
    fontSize:'20px'
  }
  const [open, setOpen] = useState(false);
  const [err,setErr] = useState(null)

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleContact=(e)=>{
    e.preventDefault()
    axiosInstance.post('contact/',{compemail:emailRef.current.value,compname:nameRef.current.value,message:messageRef.current.value})
    .then((res)=>{
      setErr(res.data)
      handleClick();
      
    })
  }

  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              
              backgroundImage:
                "url(" + require("assets/img/spitDrone2.gif").default + ")",
            }}
          >
            {/* <video autoplay muted loop width="750" height="500" style={{objectFit: 'cover'}}
            className="absolute top-0 w-full h-full bg-center bg-cover"
          >
            <source src={video} type="video/mp4"/>
          </video> */}
            
           
            
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>


          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                  Consulting Club S.P.I.T
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                  A one stop platform to be updated, grab various opportunities and connect with S.P.I.T's alumni.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">

              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Projects</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    We take projects from diverse companies and recruit students depending on their skill sets for each project providing them hands-on industry experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blueGray-700">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Events</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    Our events include non-repetitive workshops, seminars, discussions, competitions and challenges for students. Each event makes the student aware of the current scope in technical as well as non-technical domains and available opportunities for which they are eligible.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Website</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    This website aims to build a community that shares their experience, contributes their knowledge and believes in growing together.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Just 4 steps and benefits all yours !
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  ⚫ Register with us
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  ⚫ Tell us about yourself
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  ⚫ Find and apply for projects that suit you !
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  ⚫ Connect with your Alumni
                </p>
                <button
                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button" onClick={()=>history.push('/auth/register')}
                >
                  Register Now
                </button>
              </div>

              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src={imge1}
                    style={{height:'400px',width:'100%'}}
                    className="w-full align-middle rounded-t-lg"
                  />
                  {/* <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-lightBlue-500 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Top Notch Services
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      The Arctic Ocean freezes every winter and much of the
                      sea-ice then thaws every summer, and that process will
                      continue whatever happens.
                    </p>
                  </blockquote> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">Our Journey</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    Founded by <span style={spanstyle}>Kushagra Gautam</span>, <span style={spanstyle}>Arnav Chaudhari</span> and <span style={spanstyle}>Harsh Agrawal</span> from the Electronics branch at S.P.I.T. (batch 2022).<br/>
                    Within 6 months since the founding date, we have worked with companies like <span style={spanstyle}> Pidilite</span>, <span style={spanstyle}>Indian Pharmaceutical Alliance</span>, <span style={spanstyle}>Hedgingwolves</span> and <span style={spanstyle}>BrandInnerworld</span>
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Carefully crafted components
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Amazing page examples
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="far fa-paper-plane"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Dynamic components
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-4">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">This is US</h2>
                <p className="text-xl leading-relaxed m-4 text-blueGray-500">
                  Our small :) team of dedicated minds. A little sneak peek at our committee members 😀
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-12/12 lg:w-12/12 lg:mb-0 mb-12 px-4" style={{paddingBottom:'20px'}}>
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team/rita.png").default}
                    className="shadow-lg rounded-full mx-auto max-w-180-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Dr. Rita Das</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Faculty Mentor
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team/harsh.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-180-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Harsh Agrawal</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      President
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={()=>window.open('https://www.linkedin.com/in/harsh-agrawal-58830b161')}
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team/kushagra.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-180-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Kushagra Gautam</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Vice President
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={() => window.open('https://www.linkedin.com/in/kushagra-gautam-')}
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team/arnav.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-180-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Arnav Chaudhari</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Vice President
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={()=>window.open('https://www.linkedin.com/in/arnav-chaudhari-061968188/')}
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div style={{paddingTop:'25px'}} className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team/ashish.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-180-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Ashish Todi</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Project Manager
                    </p>
                    <div className="mt-6">
                      
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={() =>window.open('https://www.linkedin.com/in/ashish-todi-9967191a7')}
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{paddingTop:'25px'}} className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team/dil.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-180-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Dil Gupta</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Network Executive
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={()=>window.open('linkedin.com/in/dil-gupta-961668221/')}
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div style={{paddingTop:'25px'}} className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team/harshvardhan.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-180-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Harshvardhan Sethia</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Chief of Operations
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={()=>window.open('https://www.linkedin.com/in/harshvardhan-sethia')}
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{paddingTop:'25px'}} className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team/atharva.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-180-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Atharva Tagde</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Chief of Operations
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div style={{paddingTop:'25px'}} className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team/tanya.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-180-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Tanya Anupam</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Strategy Executive
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={()=>window.open('https://www.linkedin.com/in/tanya-anupam-710a71205')}
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{paddingTop:'25px'}} className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team/abhijit.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-180-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Abhijit Khune</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Head of Creatives
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={()=>window.open('https://www.linkedin.com/in/abhijit-khune-38551020b/')}
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div style={{paddingTop:'25px'}} className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team/yug.jfif").default}
                    className="shadow-lg rounded-full mx-auto max-w-180-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Yug Harlalka</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Technical Administrator
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={()=>window.open('https://www.linkedin.com/in/yugharlalka')}
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div style={{paddingTop:'25px'}} className="w-full md:w-6/12 lg:w-6/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team/mansi.png").default}
                    className="shadow-lg rounded-full mx-auto max-w-180-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Mansi Dwivedi</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={()=>window.open('https://www.linkedin.com/in/mansi-dwivedi-55b7281a7/')}
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={()=>window.open('https://github.com/mansidw')}
                      >
                        <i className="fab fa-github"></i>
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div style={{paddingTop:'25px'}} className="w-full md:w-6/12 lg:w-6/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-4-470x470.png").default}
                    className="shadow-lg rounded-full mx-auto max-w-180-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Sahil Nawale</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={()=>window.open('https://www.linkedin.com/in/sahil-nawale-5b6865213')}
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={()=>window.open('https://github.com/SahilNawale')}
                      >
                        <i className="fab fa-github"></i>
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Hear Us Out HR's !
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                All the HR's out there we'll be more than happy to get in touch with you !
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  Excellent Services
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Grow your market
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Launch time
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <form onSubmit={handleContact}>
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold text-center">
                      Fill this form and we'll get back to you.
                    </h4>
                    {/* <p className="leading-relaxed mt-1 mb-4 text-blueGray-900">
                      Complete this form and we will get back to you.
                    </p> */}
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Company Name
                      </label>
                      <input
                        required
                        ref={nameRef}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        required
                        ref={emailRef}
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        ref={messageRef}
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={err}
          action={action}
        />
      </main>
      <Footer />
    </>
  );
}
