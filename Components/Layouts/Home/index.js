import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Aos from 'aos';
import { AiOutlineRight } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Link from 'next/link'
import { Pagination } from "swiper";
import "swiper/css/bundle";
import { Card } from 'antd';
import Cards from '../../Shared/Cards';
import { useRouter } from 'next/router'
import { GiBowTieRibbon, GiGymBag } from "react-icons/gi";
import { SiOpenstreetmap } from "react-icons/si";

const Home = ({bestSellingData, adventureData, comboData}) => {

    const router = useRouter();
    const [bestSelling, setBestSelling] = useState([])
    const [adventures, setAdventures] = useState([])
    const [combos, setCombos] = useState([])

    useEffect(() => {
        Aos.init({duration:700});
        setAdventures(adventureData)
        setBestSelling(bestSellingData)
        setCombos(comboData)
    }, [])
    
    return (
    <div className='home-styles' data-aos="fade-in">
        <div className='hero py-4'>
        {/* Header */}
        {/* Header */}
        <div className='navBar'>
          <Link className='navLink' href='/'>HOME</Link>
        <div className='dropdown'>
        <div className='navLink dropbtn'>DESTINATION</div>
        <div className="dropdown-content">
            <a className='menu-drop-links pb-2'>Dubai</a>
        </div>
        </div>
          <span className="navLink">
            <img src={'/images/logo.png'} height={100} />
          </span>
          <div className='dropdown mx-2'>
            <span className='navLink dropbtn'>ACTIVITIES</span>
            <div className="dropdown-content">
                <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Theme Park'}}}>Theme Parks</Link>
                <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Water Parks'}}}>Water Parks</Link>
                <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'City Tours'}}}>City Tours</Link>
                <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Luxury Tours'}}}>Luxury Tours</Link>
                <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/activities', query:{id:'Adventure'}}}>Adventure</Link>
            </div>
          </div>
          <Link className='navLink' href='/'>CONTACT</Link>
        </div>

        {/* TEXT */}
        <div className='hero-cont' data-aos='fade-up'>
            <h1 className='wh-txt hero-txt-1'>TICKET VALLEY</h1>
            <h1 className='wh-txt hero-txt-2'>Travel & Tours</h1>
        </div>
        </div>
        <div className='py-5 why-us-section'>
        <Container className='my-5 py-3'>
            <div>
            <Row  data-aos='fade-up'>
                <Col className='fs-20 grey-txt' md={6}>
                    <img className='mt-5 mb-3' src='images/binoculars.png' />
                    <h3 className='mb-5 fw-700 black-txt'>WHY CHOOSE <span className='border-btm'>US?</span></h3>
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
                </Col>
                <Col md={6} className='py-5'>
                    <img src={'images/Asset 2-8.png'} style={{width:'48vw'}} />
                </Col>
            </Row>
            </div>
        </Container>
        </div>

        <div className='py-5 white-bg'>
            <Container className='my-5 py-1'>
                <Row>
                    <Col className='text-center px-5 mx-3'>
                        <GiBowTieRibbon className='mb-3' color='#2467db' size={40} />
                        <h5 className='fw-700 mb-3'>20 YEARS EXPERIENCES</h5>
                        <p className='grey-txt fs-18'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated.</p>
                    </Col>
                    <Col className='text-center px-5 mx-3'>
                        <SiOpenstreetmap className='mb-3' color='#2467db' size={40} />
                        <h5 className='fw-700 mb-3'>MOST COMPLETED MAP</h5>
                        <p className='grey-txt fs-18'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated.</p>
                    </Col>
                    <Col className='text-center px-5 mx-3'>
                        <GiGymBag className='mb-3' color='#2467db' size={40} />
                        <h5 className='fw-700 mb-3'>PACKING ADVISE</h5>
                        <p className='grey-txt fs-18'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated.</p>
                    </Col>
                </Row>
            </Container>
        </div>

        {/* Hot Avtivities */}
        <div className='py-5 section-bg'>

            <Container className='my-5' data-aos='fade-up'>
            <h3 className='my-5 fw-700'>BEST SELLING <span className='border-btm'>ACTIVITIES</span></h3>
            <Swiper slidesPerView={3} spaceBetween={30} pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {bestSelling.map((x, i)=>{
                    return(
                        <SwiperSlide className='card-slide' key={i} onClick={()=>
                            router.push({
                            pathname: '/product',
                            query: { id: x.id },
                        })}>
                        <Cards title={x.title} image={x.main_image} price={`${x.adult_price} AED`} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            </Container>

            <Container className='my-5' data-aos='fade-up'>
            <h3 className='my-5 fw-700'>ADVENTURES AND TOUR <span className='border-btm'>ACTIVITIES</span></h3>
            <Swiper slidesPerView={3} spaceBetween={30} pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {adventures.map((x, i)=>{
                    return(
                        <SwiperSlide className='card-slide' key={i} onClick={()=>
                            router.push({
                            pathname: '/product',
                            query: { id: x.id },
                        })}>
                        <Cards title={x.title} image={x.main_image} price={`${x.adult_price} AED`} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            </Container>

            <Container className='my-5' data-aos='fade-up'>
            <h3 className='my-5 fw-700'>COMBO TOURS <span className='border-btm'>ACTIVITIES</span></h3>
            <Swiper slidesPerView={3} spaceBetween={30} pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {combos.map((x, i)=>{
                    return(
                        <SwiperSlide className='card-slide' key={i} onClick={()=>
                            router.push({
                            pathname: '/product',
                            query: { id: x.id },
                        })}>
                        <Cards title={x.title} image={x.main_image} price={`${x.adult_price} AED`} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            </Container>
        </div>
    </div>
  )
}

export default Home