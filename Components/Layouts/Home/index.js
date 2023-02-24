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

const Home = () => {

    const router = useRouter();
    const [bestSelling, setBestSelling] = useState([])
    const [adventures, setAdventures] = useState([])
    const [combos, setCombos] = useState([])

    useEffect(() => {
        Aos.init({duration:700});
        getData();
    }, [])

    const getData = async() => {
          await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ADV_CATEGORY,{
            headers:{ "category": "Best Selling" }
          }).then((x)=>{
            setBestSelling(x.data.result);
            axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ADV_CATEGORY,{
                headers:{ "category": "Adventure Tours" }
              }).then((x)=>{
                setAdventures(x.data.result);
                axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ADV_CATEGORY,{
                    headers:{ "category": "Combo Tours" }
                  }).then((x)=>setCombos(x.data.result))
            })
        })
    }

    return (
    <div className='home-styles' data-aos="fade-in">
        <VideoComp/>

        <div className='py-5 why-us-section'>
        <Container className='my-5 py-3'>
            <div>
            <Row  data-aos='fade-up'>
                <Col className='grey-txt' md={7}>
                    <p className='mb-5 fw-400 fs-55 blue-txt'><span className='border-btm'>WHY</span> CHOOSE US?</p>
                    <div className='mb-5 fw-700 fs-55 black-txt' style={{lineHeight:1}}>DISCOVER THE <span className='blue-txt'>WORLD</span> WITH OUR GUIDE</div>
                    <span className='fs-20 black-txt fw-500'>
                        <p>
                            It{"’"}s our passion and our expertise, and has been for over two decades.
                            We know the trails and the towns inside and out. We know the hoteliers and their rooms,
                            and restauranteurs and their menus. We don{"’"}t guide on any route we haven{"’"}t done many times before.
                            Our expertise gives you a richer, more enjoyable experience, and we will makes better use of your time. 
                        </p>
                        <p>
                            We provide a thorough and complete orientation, so you are fully prepared to make the most of your Swiss vacation or Alps hiking adventure.
                            Your expert trip leader is with you for the entire trip
                        </p>
                    </span>
                </Col>
                <Col md={5} className='py-1'>
                    <div style={{float:'right'}}>
                        <img src={'images/why-us.png'} style={{width:'32vw'}} />
                    </div>
                </Col>
            </Row>
            </div>
        </Container>
        </div>

        <div className='py-1 white-bg'>
            <Container className='my-5 py-1'>
                <Row>
                    <Col className='text-center px-5 mx-0'>
                        <img src={'/other-assets/home-1.png'} height={130} />
                        <h4 className='fw-700 my-3 lt-blue-txt'>20 YEARS EXPERIENCES</h4>
                        <p className='black-txt fw-500 fs-18' >Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated.</p>
                    </Col>
                    <Col className='text-center px-5 mx-0'>
                        <img src={'/other-assets/home-3.png'} height={130} />
                        <h4 className='fw-700 my-3 lt-blue-txt'>MOST COMPLETED MAP</h4>
                        <p className='black-txt fw-500 fs-18'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated.</p>
                    </Col>
                    <Col className='text-center px-5 mx-0'>
                        <img src={'/other-assets/home-2.png'} height={130} />
                        <h4 className='fw-700 my-3 lt-blue-txt'>PACKING ADVISE</h4>
                        <p className='black-txt fw-500 fs-18'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated.</p>
                    </Col>
                </Row>
            </Container>
        </div>

        <div className='py-5 section-bg'>
        <Container className='my-5 py-3'>
            <div>
            <Row  data-aos='fade-up'>
                <Col md={6} className='py-1'>
                    <div className='px-5'>
                        <img src={'images/about-us.png'} style={{width:'33vw'}} />
                    </div>
                </Col>
                <Col className='grey-txt' md={6}>
                    <p className='mb-5 fw-400 fs-55 blue-txt'><span className='border-btm'>About</span> US!</p>
                    <br/>
                    <div className='fs-20 black-txt fw-500'>
                        <p>
                            It{"’"}s our passion and our expertise, and has been for over two decades.
                            We know the trails and the towns inside and out. We know the hoteliers and their rooms,
                            and restauranteurs and their menus. We don{"’"}t guide on any route we haven{"’"}t done many times before.
                            Our expertise gives you a richer, more enjoyable experience, and we will makes better use of your time. 
                        </p>
                        <p>
                            We provide a thorough and complete orientation, so you are fully prepared to make the most of your Swiss vacation or Alps hiking adventure.
                            Your expert trip leader is with you for the entire trip
                        </p>
                    </div>
                </Col>
            </Row>
            </div>
        </Container>
        </div>

        {/* Hot Avtivities */}
        <div style={{backgroundColor:"white"}}>
            <Container className='py-5 px-4'>
            <div className='blue-txt px-3' style={{letterSpacing:7}}>CHOOSE YOUR PLACE</div>
            <h1 className='fw-700 px-3'><span className='black-txt'>BEST</span> <span className='blue-txt'>SELLING ACTIVITIES</span></h1>
            {bestSelling.length>0 && 
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
            {bestSelling.length==0 && <div className='text-center'> <img src='/loader.svg' /> </div>}
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
    </div>
  )
}

export default Home