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

const Desktop = ({combos, adventures, bestSelling}) => {

    useEffect(() => {
        Aos.init({duration:700});
    }, [])

    return (
    <div className='home-styles' data-aos="fade-in">
        <VideoComp/>
        {/* Hot Avtivities */}
        <div style={{backgroundColor:"white"}} className='bg-02'>
            <CircleIcons/>
            <Container className='pt-5 px-4'>
            {/* <Widget publicKey='b88855950ae25756154e' id='file' multiple={true}
                onFileSelect={(file) => {
                    console.log('File changed: ', file)
                
                    if (file) {
                      file.progress(info => console.log('File progress: ', info.progress))
                      file.done(info => console.log('File uploaded: ', info))
                    }
                  }}
                  onChange={info => console.log('Upload completed:', info)}
            /> */}
            <div className='blue-txt px-3' style={{letterSpacing:7}}>CHOOSE YOUR PLACE</div>
            <h1 className='fw-700 px-3'><span className='black-txt'>BEST</span> <span className='blue-txt'>SELLING ACTIVITIES</span></h1>
            {bestSelling?.length>0 && 
            <div>
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
            </div>
            }
            {bestSelling?.length==0 && <div className='text-center'> <img src='/loader.svg' /> </div>}
            </Container>
        </div>
        {/* <Slider/> */}
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
                {adventures?.map((x, i)=>{
                    return(
                        <SwiperSlide className='' key={i}>
                            <TourCardOne tour={x} height={220} info={true} font={18} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            {adventures?.length==0 && <div className='text-center'> <img src='/loader.svg' /> </div>}
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
                {combos?.map((x, i)=>{
                    return(
                        <SwiperSlide className='' key={i}>
                            <TourCardOne tour={x} height={220} info={true} font={18} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            {combos?.length==0 && <div className='text-center'> <img src='/loader.svg' /> </div>}
        </Container>

        </div>
        <SignUp/>
    </div>
  )
}

export default React.memo(Desktop)