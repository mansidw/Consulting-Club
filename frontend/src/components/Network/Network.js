import React,{Fragment, useEffect,useState} from 'react'
import Navbar from "components/Navbars/AuthNavbar";
import Footer from "components/Footers/Footer.js";
import Container from '@material-ui/core/Container';
import '../../assets/styles/eventcards.css'
import '../../assets/styles/network.css'
import Grid from '@material-ui/core/Grid';
import DispYear from './DispYear'
import Button from '@mui/material/Button';
import axiosInstance from 'AxiosInstance';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';

const Network = () => {

    const [message,setMessage] = useState([])
    const [profile,setProfile] = useState([])
    const [totbranch,setTotbranch] = useState([])
    const [dummy,setDummy] = useState(1)
    const [nodata,setNodata] = useState(0)
    const [loggedIn,setLoggedIn] = useState(false)
    const [year,setYear] = useState("")
    const [branch, setBranch] = useState('');

    const handleChangeBranch = (event) => {
        setBranch(event.target.value);
        
        if(year===""){
            axiosInstance.get(`network/get-thisbranch/${event.target.value}`)
            .then(response=>{
                if(response.data===""){
                    setDummy(1)
                    setNodata(1)
                }
                else{
                    setProfile(response.data)
                    setNodata(0)
                    setDummy(0)
                }
                // console.log(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            axiosInstance.post('getbranchyear/',{'branch':event.target.value,'year':year})
            .then(response=>{
                if(response.data===""){
                    setDummy(1)
                    setNodata(1)
                }
                else{
                    setProfile(response.data)
                    setNodata(0)
                    setDummy(0)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }


    };

    useEffect(() => {
        axiosInstance.get('network/get-years')
        .then(response => {
            setMessage(response.data)
            // console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })

        axiosInstance.get('network/get-branch')
        .then(res=>{
            // console.log(res.data)
            setTotbranch(res.data)
        })
        .catch(err=>{
            console.log(err)
        })

        axiosInstance.post('verify/').then((res)=>{
            if(res.data==="True") setLoggedIn(true)
        })
    }, [])

    const handleClick = (index)=>{
        var ele=index
        setYear(ele)
        setBranch("")

        axiosInstance.get(`network/${ele}`)
         .then(function(response) {
            if(response.data===""){
                setDummy(1)
                setNodata(1)
            }
            else{
                setProfile(response.data)
                setNodata(0)
                setDummy(0)
            }
         })
         .catch(function(error) {
            console.log(error);
         });
    }

    if(!loggedIn){
        return <h1>Login First</h1>
    }

    return (
        <Fragment>
        <Navbar transparent />
            <main style={{'paddingBottom':'20px',marginBottom:'40px'}}>
                <div style={{backgroundImage:"url(" + require("assets/img/wallpaper.png").default + ")",backgroundColor:'black',backgroundRepeat:'no-repeat',backgroundSize:'100%'}}>
                <Container>
                
                <section className="dark" style={{paddingTop:'120px'}}>
                    <div className="container py-4">
                    
                   
                        <Grid container spacing={4} style={{'marginBottom':'10px','marginTop':'10px'}}>
                            
                            {message?message.map((item,index)=>{
                                return(
                                    <Fragment key={index}>
                                        <Button key={index} style={{backgroundColor:'white',color:'black',fontFamily:'inherit',fontWeight:'bold',height:'70px',margin:'10px',width:'120px'}} onClick={()=>handleClick(item['passoutYear'])}>{item['passoutYear']-4}-{item['passoutYear']}</Button>
                                    </Fragment>
                                )
                            }):null}
                            
                        </Grid>
                        <Grid container style={{justifyContent:'center'}}>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" id="demo-simple-select-helper-label" style={{fontFamily:'inherit',fontWeight:'bold',color:'#4a5568'}}>Branch</InputLabel>
                                    <Select
                                        required
                                        style={{backgroundColor:'white',fontFamily:'inherit'}}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={branch}
                                        className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                                        label="Branch"
                                        onChange={handleChangeBranch}
                                    >
                                        
                                            {totbranch.map((item,index)=>{
                                                return(<MenuItem key={index} style={{fontFamily:'inherit'}} value={item.branch}>{item.branch}</MenuItem>)
                                            })}
                                    </Select>
                            <FormHelperText style={{fontFamily:'inherit',color:'white',fontSize:'15px',fontWeight:'bold'}}>Enter branch for viewing branch specific results!</FormHelperText>
                            </FormControl>
                        </Grid>
                        
                        {!dummy?<DispYear data={profile}/>:null}
                        {nodata?<Alert style={{marginTop:'20px'}} severity="error" variant='standard'>Oops! No Profiles Found, Try another tab!</Alert>:null}

                    </div>
                    
                </section>
                </Container>
                {dummy?<div style={{margin:'0 auto',height:'400px'}}></div>:null}
                </div>
                
            </main>
            
        <Footer/>
        </Fragment>
    )
}

export default Network
