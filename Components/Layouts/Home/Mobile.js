
import CircleMobileIcons from "/Components/Shared/CircleMobileIcons"
import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Aos from 'aos';
import { AiOutlineRight } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Link from 'next/link'
import { Autoplay, Navigation } from "swiper";
import "swiper/css/bundle";
import { useRouter } from 'next/router';
import VideoComp from './VideoComp';
import axios from 'axios';
import TourCardOne from '../../Shared/TourCardOne';
import SignUp from '../../Shared/SignUp';
import { Widget } from "@uploadcare/react-widget";
import CircleIcons from '/Components/Shared/CircleIcons';

const Mobile = ({combos, adventures, bestSelling}) => {
  return (
    <>
    <div fluid>
      <video autoPlay loop muted style={{ width:'100%' }}>
        <source src="/videos/video3.mp4"  />
      </video>
      <CircleMobileIcons/>
    </div>
    <div className='py-5 bg-02' style={{backgroundColor:"white"}}>
        <Container className='my-5' data-aos='fade-up'>
            <h1 className='mt-3 fw-700 px-4'>ADVENTURES &<span className='blue-txt'> TOUR ACTIVITIES</span></h1>
            <Swiper slidesPerView={3} spaceBetween={30} 
                modules={[Navigation]}
                navigation={true}
                className="mySwiper"
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {adventures.map((x, i)=>{
                    return(
                        <SwiperSlide className='' key={i}>
                            <TourCardOne tour={x} height={220} info={true} font={18} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            {adventures.length==0 && <div className='text-center'> <img src='/loader.svg' /> </div>}
        </Container>

        <Container className='my-0 py-3' data-aos='fade-up'>
            <h1 className='mt-3 fw-700 px-4'>COMBO<span className='blue-txt'> TOUR ACTIVITIES</span></h1>
            <Swiper slidesPerView={3} spaceBetween={30} 
                modules={[Navigation]}
                navigation={true}
                className="mySwiper"
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {combos.map((x, i)=>{
                    return(
                        <SwiperSlide className='' key={i}>
                            <TourCardOne tour={x} height={220} info={true} font={18} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            {combos.length==0 && <div className='text-center'> <img src='/loader.svg' /> </div>}
        </Container>

        </div>
    </>
  )
}

export default Mobile