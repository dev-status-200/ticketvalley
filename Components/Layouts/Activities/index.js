import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Cards from '../../Shared/Cards';
import { useRouter } from 'next/router';
import axios from 'axios';
import Aos from 'aos';
import { Empty } from 'antd';
import TourCardOne from '../../Shared/TourCardOne';

const Activities = ({activity}) => {
  const [load, setLoad] = useState(true);
  const [bg, setBg] = useState("");
  const [activities, setActivities] = useState([]);

    useEffect(() => {
      Aos.init({duration:700});
      getTourData();
      if(activity=="Theme Parks"){
        setBg("theme")
      } else if(activity=="Water Parks"){
        setBg("water")
      } else if(activity=="City Tours"){
        setBg("city")
      } else if(activity=="Luxury Tours"){
        setBg("luxury")
      } else if(activity=="Adventure"){
        setBg("adv")
      } 
    }, [])

    const getTourData = async() => {
        await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_BASE_CATEGORY,{
            headers:{ "category": `${activity}` }
          }).then((x)=>{
            setActivities(x.data.result);
            setLoad(false);
        })
    }

  return (
    <div className='home-styles'>
    <div className={`${bg} activity py-4`}>
      {/* Header */}
      <div className='navBar'>
        <Link className='navLink' href='/'>HOME</Link>
      <div className='dropdown'>
      <div className='navLink dropbtn'>DESTINATION</div>
      <div className="dropdown-content">
          <a className='menu-drop-links pb-2'>Dubai</a>
      </div>
      </div>
        <span className="navLink">
          <img src={'/images/logo.png'} height={100} />
        </span>
        <div className='dropdown  mx-2'>
          <span className='navLink dropbtn'>ACTIVITIES</span>
          <div className="dropdown-content">
              <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Theme Parks'}}}>Theme Parks</Link>
              <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Water Parks'}}}>Water Parks</Link>
              <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'City Tours'}}}>City Tours</Link>
              <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Luxury Tours'}}}>Luxury Tours</Link>
              <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/activities', query:{id:'Adventure'}}}>Adventure</Link>
          </div>
        </div>
        <Link className='navLink' href='/about'>ABOUT US</Link>
      </div>
      <h1 className='text-center mt-5 wh-txt fw-700 text-shadow fs-45'>{activity.toUpperCase()}  ACTIVITIES</h1>
    </div>
    {!load &&
    <div className='p-3'>
      {activities.length>0 &&
      <Container className='my-5' data-aos='fade-up'>
        <Row>
        {activities.map((x, i)=>{
            return(
              <Col md={4} className='card-slide my-5' key={i}>
                <TourCardOne tour={x} height={300} info={true} />
              </Col>
            )
        })}
        </Row>
      </Container>
      }
      {activities.length==0 &&
          <Container className='py-5' data-aos='fade-up'>
              <Empty />
              <h1 className='text-center fw-200 mt-5'>Sorry No Activities Added Yet!</h1>
          </Container>
      }
    </div>
    }
    {load &&
      <div style={{backgroundColor:"white"}} className="text-center py-5">
          <img src={'/loader.svg'} className="my-5 py-5" />
      </div>
    }
    </div>
  )
}

export default Activities