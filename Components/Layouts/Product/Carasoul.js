import React from 'react';
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
      {props.images.map((x, i)=>{
        return(
        <SwiperSlide key={i}>
          <img src={x} alt="" />
        </SwiperSlide>
        )
      })}
      {/* <SwiperSlide>
        <img src={'/tour-images/4.png'} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={'/tour-images/3.png'} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={'/tour-images/1.png'} alt="" />
      </SwiperSlide> */}
    </Swiper>
  </>
  )
}

export default Carasoul