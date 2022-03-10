import axiosInstance from 'AxiosInstance'
import { BaseUrl } from 'AxiosInstance'
import React,{useEffect,useState} from 'react'
import { useHistory } from 'react-router-dom'

const Event = (props) => {
    const colour=['red','blue','green','yellow']
    const url='#'
    const [loggedIn,setLoggedIn] = useState(false);
    const history = useHistory();
    
    // console.log(props['arr'][0])

    useEffect(() => {
        axiosInstance.post('verify/').then((res)=>{
          if(res.data==="True") setLoggedIn(true)
        })
      }, [])
    
    const ChangeDate=(props)=>{
        return(<><i className="fas fa-calendar-alt mr-2"></i>{props.date}</>)
    }

    const checkLoggedIn = (val)=>{
        if (loggedIn){
            window.open(val)
        }
        else{
            history.push('/auth/login')
        }
    }

    return (
        <>
        {props.arr.map((item,key)=>{
            let image = props['arr'][key]['image']
            return (<article key={key} className={`postcard dark ${colour[key%4]}`} style={{paddingBottom:'20px',display:"flex",alignItems:"center"}}>
                <a className="postcard__img_link" href={url}>
                    <img style={{height:"100%"}} className="postcard__img" src={BaseUrl+"media/"+image} alt='event'/>
                </a>
                <div style={{textAlign:"center"}} className="postcard__text">
                    <h1  className={`postcard__title ${colour[key%4]}`}>{item.name}</h1>
                    <div className="postcard__subtitle small">
                        <time dateTime="2020-05-25 12:00:00">
                            <ChangeDate date={item.date}/>
                        </time>
                    </div>
                    <div className="postcard__bar"></div>
                    <div style={{textAlign:"center"}} className="postcard__preview-txt">{item.details}</div>
                    {item.finished?
                    <ul className="postcard__tagbox">
                        <li className="tag__item" onClick={()=>checkLoggedIn(item.resources)}><i className="fas fa-tag mr-2" ></i>Resources</li>
                    </ul>:
                    <ul className="postcard__tagbox">
                        <li className="tag__item" onClick={()=>checkLoggedIn(item.formLink)}><i className="fas fa-cabinet-filing mr-2" ></i>Register</li>
                    </ul>}
                </div>
            </article>)
        })}
         
        </>
    )
}

export default Event
