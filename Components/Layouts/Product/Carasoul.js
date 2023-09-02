import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const Carasoul = (props) => {
  
  return (
    <>
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {props.images.split(",").map((x, i)=>{
        return(
        <SwiperSlide key={i}>
          <img src={x} alt="Tour Gallery" />
        </SwiperSlide>
        )
      })}
    </Swiper>
  </>
  )
}

export default Carasoul