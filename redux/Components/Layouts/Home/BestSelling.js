import React, { useEffect, useState } from 'react';
import TourCardOne from '../../Shared/TourCardOne';
import { Col, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from 'axios';
import { Autoplay, Navigation } from "swiper";

const BestSelling = () => {

    const [bestSelling, setBestSelling] = useState([])

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ADV_CATEGORY,{
            headers:{ "category": "Best Selling" }
        }).then((x)=>{
            if(x.data.status=="success"){
                setBestSelling(x.data.result);
            }
        })
    }, [])
    
  return (
    <>
    {bestSelling?.length>0 &&
    <>
        <Row className='px-3'>
            <Col md={8} data-aos='fade-right'>
                <TourCardOne tour={bestSelling[0]} height={440} info={false}  />
            </Col>
            <Col md={4} data-aos='fade-down'>
                <TourCardOne tour={bestSelling[1]} height={440} info={false} />
            </Col>
        </Row>
        <Row className='mt-2' data-aos='fade-left'>
        <Swiper slidesPerView={3} spaceBetween={30}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            modules={[Navigation]}
            navigation={true}
            className="mySwiper"
        >
            {bestSelling.slice(2).map((x, i)=>{
                return(
                    <SwiperSlide className='' key={i}>
                        <TourCardOne tour={x} height={210} info={false} />
                    </SwiperSlide>
                )
            })}
        </Swiper>
        </Row>
    </>
    }
    {bestSelling?.length==0 && <div className='text-center'> <img src='/loader.svg'  alt="Loader"/> </div>}
    </>
  )
}

export default BestSelling