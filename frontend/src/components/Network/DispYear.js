import React,{Fragment} from 'react'
import "../../assets/styles/network.css"
import Grid from '@material-ui/core/Grid';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Stack from '@mui/material/Stack';
import MoreIcon from '@mui/icons-material/More';
import { Container } from '@material-ui/core';
import { BaseUrl } from 'AxiosInstance';
import DefPro from "../../assets/img/defAvatar.jpg"

const DispYear = (props) => {
    return (
        <>
            <Grid container spacing={4} style={{ 'marginBottom': '20px', 'marginTop': '20px' }}>
                {props.data.map((item, index) => {
                    return (
                    <Fragment key={index}>
                        <Flippy
                            flipOnHover={true} // default false
                            flipOnClick={false} // default false
                            flipDirection="horizontal" // horizontal or vertical
                            style={{ width: '300px', height: '400px', marginRight: '10px', marginBottom: '10px', }} /// these are optional style, it is not necessary
                        >
                            <FrontSide style={{ backgroundColor:"#041C32",backgroundImage: (item['profilePic']?"url("+BaseUrl + "media/" + item['profilePic'] +")":`url(${DefPro})`), color: 'white', marginLeft: '20px',backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center" }}>
                                <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', padding: '10px', marginTop: '310px', background: 'linear-gradient(90deg, #041C32 0%, #406882 100%)', borderRadius: '20px' }}>{item.name}</div>
                            </FrontSide>
                            <BackSide style={{ background: 'linear-gradient(90deg, #041C32 0%, #406882 100%)', color: 'white', marginLeft: '20px' }}>
                                <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', padding: '10px' }}>
                                    Branch : {item.branch}<br /><br />
                                    {item.currentCompany? <>Company : {item.currentCompany}<br /><br /></>:null}
                                    Skills : <ul>
                                        {item.skills.split(",").map((item, key) => {
                                        return <li style={{ fontWeight: 'bold', fontSize: '15px', padding: '2px' }} key={key}>{item}</li>
                                    })}
                                    </ul>
                                </div>



                                <Container>
                                    <Stack direction="row" spacing={4} alignItems="center" style={{ marginTop: '60px', }}>
                                        {item['githubProfile'] !== "" ?
                                            <a type="button" key={index} target="_blank" href={item['githubProfile']}><GitHubIcon fontSize='large' /></a> : null}
                                        {item['linkedInProfile'] !== "" ?
                                            <a type="button" key={index} target="_blank" href={item['linkedInProfile']}><LinkedInIcon fontSize='large' /></a> : null}
                                        {item['otherLinks'] !== "" ?
                                            <a type="button" key={index} target="_blank" href={item['otherLinks']}><MoreIcon fontSize='large' /></a> : null}
                                    </Stack>
                                </Container>



                            </BackSide>
                        </Flippy>
                    </Fragment>
                    )
                })}



            </Grid>
        </>

    )
}

export default DispYear
