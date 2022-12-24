import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Aos from 'aos';
import { AiOutlineRight } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import "swiper/css/bundle";
import { Rate } from 'antd';

const Home = () => {

    useEffect(() => {
        Aos.init({duration:700});
    }, [])
    
    return (
    <div className='home-styles' data-aos="fade-in">
        <div className='hero'>
        {/* Header */}
        <div className='text-center pt-4'> 
            <button className="dropbtn">HOME</button>
            <div className="dropup">
            <button className="dropbtn">DESTINATIONS</button>
            <div className="dropup-content">
                <div className='links'>Museum of the Future</div>
                <div className='links'>Infinity De Lumieres</div>
                <div className='links'>Dubai Safari Park</div>
                <div className='links'>The Palm Monorail</div>
                <div className='links'>Inside Burj Al Arab</div>
            </div>
            </div>
            <span className="dropbtn">
                <img src={'/images/logo.png'} height={100} />
            </span>
            
            <button className="dropbtn">TOURS</button>
            <button className="dropbtn mx-3">CONTACT</button>
        </div>

        {/* TEXT */}
        <div className='hero-cont'>
            <h1 className='wh-txt hero-txt-1'>PEACELAND</h1>
            <h1 className='wh-txt hero-txt-2'>Travel & Tours</h1>
        </div>
        </div>
        {/* Hot Avtivities */}
        <div className='arabic-bg py-5'>
            <Container className='my-5 py-5'>
            <h3 className='my-5 fw-700 wh-txt'>NEW YEARS EVE ACTIVITIES</h3>
            <Swiper slidesPerView={3} spaceBetween={30} pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide className='card-slide'>
                    <Row>
                        <img src={'/tour-images/dinner-cruise.png'}/>
                        <div className='p-4'>
                            <div className='card-heading'>Dhow Dinner Cruise - Dubai Marina</div>
                            <Col md={5}><Rate allowHalf defaultValue={2.5} /></Col>
                            <Col md={5}>(1 Review)</Col>
                            <div className='card-price mx-3'>400 <span className='gold'>AED</span></div>
                        </div>
                    </Row>
                </SwiperSlide>
                <SwiperSlide className='card-slide'>
                    <Row>
                        <img src={'/tour-images/burj-fire.jpg'}/>
                        <div className='p-4'>
                            <div className='card-heading'>Celebration Burj Khalifa Fireworks</div>
                            <Col md={5}><Rate allowHalf defaultValue={2.5} /></Col>
                            <Col md={5}>(1 Review)</Col>
                            <div className='card-price mx-3'>1,130 <span className='gold'>AED</span></div>
                        </div>
                    </Row>
                </SwiperSlide>
                <SwiperSlide className='card-slide'>
                    <Row>
                        <img src={'/tour-images/new-year-cruise.png'}/>
                        <div className='p-4'>
                            <div className='card-heading'>New Year's Eve Cruise</div>
                            <Col md={5}><Rate allowHalf defaultValue={2.5} /></Col>
                            <Col md={5}>(1 Review)</Col>
                            <div className='card-price mx-3'>1,230 <span className='gold'>AED</span></div>
                        </div>
                    </Row>
                </SwiperSlide>
            </Swiper>
            </Container>
        </div>
    </div>
  )
}

export default Home
