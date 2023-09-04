import React, { useEffect, useState } from 'react';
import TourCardOne from '../../Shared/TourCardOne';
import { Col, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from 'axios';
import { Autoplay, Navigation } from "swiper";
import MobileCard from '../../Shared/MobileCard';

const AdventureTours = () => {

    const [adventures, setAdventures] = useState([])

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ADV_CATEGORY,{
            headers:{ "category": "Adventure Tours" }
        }).then((x)=>{
            if(x.data.status=="success"){
                setAdventures(x.data.result);
            }
        })
    }, [])

  return (
    <>
        <div className='desktop'>
            <Swiper slidesPerView={3} spaceBetween={30} 
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
                            <TourCardOne tour={x} height={220} info={true} font={18} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            {adventures?.length==0 && <div className='text-center'> <img src='/loader.svg'  alt="Loader" /> </div>}
        </div>
        <div className="mobile" >
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
                        <MobileCard tour={x} height={110} info={true} font={12} />
                    </SwiperSlide>
                    )})}
            </Swiper>
            {adventures?.length==0 && <div className='text-center'> <img src='/loader.svg' alt="Loader" /> </div>}
        </div>
    </>
  )
}

export default AdventureTours