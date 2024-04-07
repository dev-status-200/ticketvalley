import React, { useEffect, useState } from 'react';
import TourCardOne from '../../Shared/TourCardOne';
import { Col, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from 'axios';
import { Autoplay, Navigation } from "swiper";

const BestSellingMobile = () => {

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
      <h1 className='fw-700 px-3'><span className='black-txt'>BEST</span> <span className='blue-txt'>SELLING ACTIVITIES</span></h1>
      <Row className='px-3'>
        <Col xs={12} data-aos='fade-right'>
          <TourCardOne tour={bestSelling[1]} height={240} info={false}  />
        </Col>
        <Col xs={12} data-aos='fade-down'>
          <div className='mt-2'>
            <TourCardOne tour={bestSelling[0]} height={450} info={false} />
          </div>
        </Col>
      </Row>
      <Row className='mt-2' data-aos='fade-left'>
      <Swiper slidesPerView={1}
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
                <SwiperSlide style={{paddingLeft:28, paddingRight:28}} key={i}>
                    <TourCardOne tour={x} height={210} info={false} />
                </SwiperSlide>
            )})}
      </Swiper>
    </Row>
  </>
  }
  {bestSelling?.length==0 && <div className='text-center'> <img src='/loader.svg'  alt="Loader"/> </div>}
  </>
  )
}

export default React.memo(BestSellingMobile)