
import CircleMobileIcons from "/Components/Shared/CircleMobileIcons"
import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper";
import "swiper/css/bundle";
import MobileCard from '../../Shared/MobileCard';
import SignUp from '../../Shared/SignUp';

const Mobile = ({combos, adventures, bestSelling}) => {
  return (
    <>
    <div fluid="true">
      <video autoPlay loop muted style={{ width:'100%' }}>
        <source src="/videos/video3.mp4"  />
      </video>
      <CircleMobileIcons/>
    </div>
    <div className=' bg-02' style={{backgroundColor:"white"}}>
      <Container className='my-5' data-aos='fade-up'>
          <h3 className='mt-3 fw-700 text-center'>ADVENTURES & TOUR<span className='blue-txt'> ACTIVITIES</span></h3>
          <Swiper slidesPerView={2} spaceBetween={10} 
              modules={[Navigation]}
              navigation={true}
              className="mySwiper"
              autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
              }}
          >
              {adventures?.map((x, i)=>{
                return(
                  <SwiperSlide className='' key={i}>
                      <MobileCard tour={x} height={110} info={true} font={12  } />
                  </SwiperSlide>
                )})}
          </Swiper>
          {adventures?.length==0 && <div className='text-center'> <img src='/loader.svg' /> </div>}
      </Container>
      <Container className='my-0 pb-5' data-aos='fade-up'>
          <h3 className=' fw-700 text-center'>COMBO TOUR<span className='blue-txt'>  ACTIVITIES</span></h3>
          <Swiper slidesPerView={2} spaceBetween={10} 
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
                        <MobileCard tour={x} height={110} info={true} font={12  } />
                    </SwiperSlide>
                  )
              })}
          </Swiper>
          {combos?.length==0 && <div className='text-center'> <img src='/loader.svg' /> </div>}
      </Container>
      <SignUp mobile={true} />
    </div>
    </>
  )
}

export default React.memo(Mobile)