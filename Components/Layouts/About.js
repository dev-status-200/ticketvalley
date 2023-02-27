import React, { useEffect } from 'react';
import Link from 'next/link';
import { Row, Col, Container } from 'react-bootstrap';
import Aos from 'aos';

const About = () => {

    useEffect(() => {
        Aos.init({duration:300})
    }, [])
    
  return (
    <div className='home-styles' >
        <div data-aos="fade-in">
            <div className='about-us activity py-4' style={{minHeight:500}}>
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
            <div className='dropdown  mx-2'>
                <span className='navLink dropbtn'>ACTIVITIES</span>
                <div className="dropdown-content">
                    <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Theme Parks'}}}>Theme Parks</Link>
                    <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Water Parks'}}}>Water Parks</Link>
                    <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'City Tours'}}}>City Tours</Link>
                    <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Luxury Tours'}}}>Luxury Tours</Link>
                    <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/activities', query:{id:'Adventure'}}}>Adventure</Link>
                </div>
            </div>
            <Link className='navLink' href='/about'>ABOUT US</Link>
            </div>
            <div className='my-5'>
                <div className='text-center'>
                <h1 className='wh-txt hero-txt-1'>ABOUT <span className='yellow-txt'>US</span></h1>
                </div>
            </div>
            </div>
        </div>

        <div className='py-5 why-us-section'>
        <Container className='my-5 py-3'>
            <div>
            <Row  data-aos='fade-up'>
                <Col className='grey-txt my-5' md={7}>
                <div className='blue-txt ' style={{letterSpacing:7}}>ABOUT US</div>
                    <div className='mb-4 fw-700 fs-55 black-txt' style={{lineHeight:1}}>FOUNDED IN <span className='blue-txt'>2000</span></div>
                    <span className='fs-20 black-txt fw-500'>
                        <p>
                        Tickets Valley is a one-stop shop for all your ticketing needs.
                        The company is based in the United Arab Emirates.
                        We specialize in providing a wide range of tickets for events and experiences throughout the UAE.
                        Our team consists of professional travel experts who have deep knowledge and understanding of different destinations around the world. 
                        With Tickets Valley, customers can browse our extensive selection of tickets and pick the ones that fit their budget and preferences best.

                        </p>
                        <p>
                        We offer tickets to all adventures, activities and attractions in the UAE.
                        We are constantly updating to ensure that our customers have access to the latest and greatest experiences. 
                        </p>
                    </span>
                </Col>
                <Col md={5} className='py-1'>
                    <div style={{float:'right'}}>
                        <img src={'images/about-us-1a.png'} style={{width:'32vw'}} />
                    </div>
                </Col>
            </Row>
            </div>
        </Container>
        </div>

        <div className='py-5' style={{backgroundColor:"white"}}>
        <Container className='my-5 py-3'>
            <div>
            <Row  data-aos='fade-up'>
                <Col className='grey-txt my-5 px-5' md={6} style={{borderRight:'1px solid black', textAlign:'right'}}>
                <div className='blue-txt mb-3' style={{letterSpacing:7}}>OUR MISSION</div>
                    <span className='fs-20 black-txt fw-500'>
                        <p>
                        Our mission is to provide our customers with access to the most exciting events and thrilling experiences
                        in the United Arab Emirates through a user-friendly and hassle-free ticketing portal.
                        We strive to create a seamless ticket buying experience that is tailored to the needs and preferences of each customer.
                        </p>
                    </span>
                </Col>
                <Col className='grey-txt my-5 px-5' md={6}>
                <div className='blue-txt mb-3' style={{letterSpacing:7}}>OUR VISION</div>
                    <span className='fs-20 black-txt fw-500'>
                        <p>
                        Our vision is to become the leading ticketing company in the UAE, known for our exceptional customer service, competitive pricing, and wide range of ticket choices. We aim to be the go-to destination for anyone looking to purchase tickets to explore UAE, and to constantly innovating our services for customers.
                        </p>
                    </span>
                </Col>
            </Row>
            </div>
        </Container>
        </div>

        <div className='why-us-bg-clr'>
            <Container className='my-5 py-3'>
                <div>
                <Row  data-aos='fade-up'>
                    <Col className='grey-txt my-5' md={7}>
                    <div className='blue-txt mb-3' style={{letterSpacing:7}}>WHY CHOOSE US</div>
                        <div className='mb-4 fw-700 fs-25 black-txt' style={{lineHeight:1}}>“DISCOVER UAE WITH OUR HASSLE-FREE TICKETING SERVICE” <span className='blue-txt'></span></div>
                        <span className='fs-20 black-txt fw-500'>
                            <p>
                            We're committed to providing you with the most convenient ticketing experience. Whether you're a resident of the UAE or a tourist looking to discover the amazing attractions the country has to offer, we invite you to choose us for all your ticketing needs.
                            INSTANT BOOKING: With our instant booking option, you can secure tickets in just a few clicks, without any hassle or delay.
                            SECURE PAYMENT GATEWAY: We ensure that your transactions are processed securely with our secure payment gateway.
                            24/7 CUSTOMER SUPPORT: Our friendly and professional team is always available to assist you whenever you need it.
                            </p>
                            <p>
                            We offer tickets to all adventures, activities and attractions in the UAE.
                            We are constantly updating to ensure that our customers have access to the latest and greatest experiences. 
                            </p>
                        </span>
                    </Col>
                    <Col md={5} className='py-1'>
                        <div style={{float:'right'}}>
                            <img src={'images/about-us-2a.png'} style={{width:'32vw'}} />
                        </div>
                    </Col>
                </Row>
                </div>
            </Container>
        </div>

    </div>
  )
}

export default About