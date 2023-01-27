import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import Cards from '../../Shared/Cards';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useRouter } from 'next/router'
import { GiBowTieRibbon, GiGymBag } from "react-icons/gi";
import { SiOpenstreetmap } from "react-icons/si";
import axios from 'axios';
import Aos from 'aos';
import { Empty } from 'antd';

const Activities = ({activity}) => {
  const router = useRouter();
  const [bg, setBg] = useState("");
  const [activities, setActivities] = useState([]);

    useEffect(() => {
        Aos.init({duration:700});
      console.log(activity);
      getTourData() 
      if(activity=="Theme Park"){
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
        const toursData = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_BASE_CATEGORY,{
            headers:{ "category": `${activity}` }
          }).then((x)=>{
            console.log(x.data.result)
            setActivities(x.data.result)
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
            <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Theme Park'}}}>Theme Parks</Link>
            <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Water Parks'}}}>Water Parks</Link>
            <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'City Tours'}}}>City Tours</Link>
            <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Luxury Tours'}}}>Luxury Tours</Link>
            <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/activities', query:{id:'Adventure'}}}>Adventure</Link>
        </div>
      </div>
      <Link className='navLink' href='/'>CONTACT</Link>
    </div>
    <h1 className='text-center mt-5 wh-txt fw-700 text-shadow fs-45'>{activity.toUpperCase()}  ACTIVITIES</h1>
    </div>
    <div className='p-3'>
    {activities.length>0 &&
    <Container className='my-5' data-aos='fade-up'>
        {/* <h3 className='my-5 fw-700 text-center'>BEST SELLING <span className='border-btm'>ACTIVITIES</span></h3> */}
        <Swiper slidesPerView={3} spaceBetween={30} pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
        >
            {activities.map((x, i)=>{
                return(
                    <SwiperSlide className='card-slide' key={i}
                    onClick={()=> { console.log("Clicked"); router.push({ pathname: '/product', query: { id: x.id }, }) }}
                    >
                    <Cards title={x.title} image={x.main_image} price={`${x.adult_price} AED`} />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    </Container>
    }
    {activities.length==0 &&
        <Container className='py-5' data-aos='fade-up'>
            <Empty />
            <h1 className='text-center fw-200 mt-5'>Sorry No Activities Added Yet!</h1>
        </Container>
    }
    </div>
    </div>
  )
}

export default Activities