import React, { useEffect } from 'react';
import Link from 'next/link';
import { Row, Col, Container } from 'react-bootstrap';
import Aos from 'aos';
import CircleIcons from '../Shared/CircleIcons';
import CircleMobileIcons from '../Shared/CircleMobileIcons';
import useWindowSize from '/functions/useWindowSize';
import Router from 'next/router';

const About = () => {

    const size = useWindowSize();
    useEffect(() => {
        Aos.init({duration:300})
    }, [])
    
  return (
    <div className='home-styles' >
      {size.width>600 &&
      <div data-aos="fade-in">
        <div className='about-us activity py-4' style={{minHeight:500}}>
          <div className='navBar'>
            <Link className='navLink' href='/'>HOME</Link>
              <div className='dropdown'>
                <div className='navLink dropbtn' onClick={()=>Router.push("/search?destination=uae&city=Dubai+City")}>DESTINATION</div>
                <div className="dropdown-content">
                  <a className='menu-drop-links pb-2' onClick={()=>Router.push("/search?destination=uae&city=Dubai+City")}>Dubai</a>
                  <a className='menu-drop-links pb-2' onClick={()=>Router.push("/search?destination=uae&city=Abu+Dhabi")}>Abu Dhabi</a>
                </div>
              </div>
            <span className="navLink">
            <img src={'/images/logo.png'} height={100} alt="Logo" />
            </span>
            <div className='dropdown  mx-2'>
            <span className='navLink dropbtn' onClick={()=>Router.push("/search?destination=uae&city=Dubai+City")}>ACTIVITIES</span>
            <div className="dropdown-content">
                <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}}>Theme Parks</Link>
                <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Water Parks' }}}>Water Parks</Link>
                <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'City Tours'  }}}>City Tours</Link>
                <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Luxury Tours'}}}>Luxury Tours</Link>
                <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Adventure'   }}}>Adventure</Link>
                <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Family Fun'   }}}>Family Fun</Link>
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
      }
      <div className='pb-5 why-us-section'>
        {size.width>600? <CircleIcons/>: <CircleMobileIcons/> }
        <Container className='my-5 py-3'>
          <div>
            <Row data-aos='fade-up'>
              <Col className='grey-txt' md={7}>
                <p className={`mb-5 fw-400 fs-${size.width>600?"30":"30"} blue-txt`}><span className='border-btm'>Company</span> Overview</p>
                <div className={`mb-5 fw-700 fs-${size.width>600?"55":"30"} black-txt`} style={{lineHeight:1}}>DISCOVER THE <span className='blue-txt'>WORLD</span> WITH OUR GUIDE</div>
                <span className={`${size.width>600?"fs-20":"fs-15"} black-txt fw-500`}>
                  <p>
                    Ticketsvalley has grown and evolved from an SME in the UAE to a well-established and recognized Travel and 
                    Tour Management Company, contributing to all the sectors of the travel industry in the UAE.
                  </p>
                  <p>
                    We proudly offer our services to almost all nationalities, warmly welcomed by us in the UAE.
                  </p>
                </span>
              </Col>
              <Col md={5} className='py-1' xs={12}>
                <div>
                  <img src={'images/why-us.png'} style={{width:size.width>600?'32vw':320}} alt="Why Us" />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>  
      {/* <div className='py-1 white-bg'>
        <Container className='my-5 py-1'>
          <Row>
            <Col className='text-center px-5 mx-0'>
                    <img src={'/other-assets/home-1.png'} height={130} alt="EXPERIENCE" />
                    <h4 className='fw-700 my-3 lt-blue-txt'>20 YEARS EXPERIENCES</h4>
                    <p className='black-txt fw-500 fs-18' >Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated.</p>
            </Col>
            <Col className='text-center px-5 mx-0'>
                    <img src={'/other-assets/home-3.png'} height={130} alt="MOST COMPLETED MAP" />
                    <h4 className='fw-700 my-3 lt-blue-txt'>EVERY AREA COVERED</h4>
                    <p className='black-txt fw-500 fs-18'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated.</p>
            </Col>
            <Col className='text-center px-5 mx-0'>
                    <img src={'/other-assets/home-2.png'} height={130} alt="PACKING ADVISE" />
                    <h4 className='fw-700 my-3 lt-blue-txt'>PACKING ADVISE</h4>
                    <p className='black-txt fw-500 fs-18'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated.</p>
            </Col>
          </Row>
        </Container>
      </div>   */}
      {/* <div className='py-5 section-bg'>
        <Container className='my-5 py-3'>
            <div>
            <Row  data-aos='fade-up'>
                {size.width>600 && <Col md={6} className='py-1'>
                    <div className='px-5'>
                        <img src={'images/about-us.png'} style={{width:'33vw'}} alt="About Us" />
                    </div>
                </Col>}
                <Col className='grey-txt' md={6}>
                    <p className={`mb-5 fw-400 fs-${size.width>600?"55":"30"} blue-txt`}><span className='border-btm'>About</span> US!</p>
                    <br/>
                    <div className={`${size.width>600?"fs-20":"fs-15"} black-txt fw-500`}>
                      <p>
                        Ticketsvalley is a renowned travel agency based in UAE, Dubai, and was founded in the year 2006.
                        It has been over a decade since we have served as a recognized travel agency in Dubai offering a wide 
                        range of travel and tourism management services.
                      </p>
                    </div>
                </Col>
            </Row>
            </div>
        </Container>
      </div>   */}
      <div className='py-5 why-us-section'>
        <Container className='my-5 py-3'>
            <div>
            <Row  data-aos='fade-up'>
                <Col className='grey-txt my-5' md={7}>
                <div className='blue-txt ' style={{letterSpacing:7}}>ABOUT US</div>
                    <div className={`mb-5 fw-400 fs-${size.width>600?"55":"30"} blue-txt`} style={{lineHeight:1}}>FOUNDED IN <span className='blue-txt'>2000</span></div>
                    <span className={`${size.width>600?"fs-20":"fs-15"} black-txt fw-500`}>
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
                <Col md={5} xs={12} className='py-1'>
                    <div style={{float:'right'}}>
                        <img src={'images/about-us-1a.png'} style={{width:size.width>600? '32vw':320}}  alt="About Us" />
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
                <Col className='grey-txt my-5 px-5' md={6} style={{borderRight:'1px solid black', textAlign:size.width>600?'right':'center'}}>
                <div className='blue-txt mb-3' style={{letterSpacing:7}}>OUR MISSION</div>
                  <span className='fs-20 black-txt fw-500'>
                    <p>
                      Our mission is to offer fast, hassle-free, and one-stop destination management services to our customers.
                    </p>
                  </span>
                </Col>
                <Col className='grey-txt my-5 px-5' md={6}>
                <div className='blue-txt mb-3' style={size.width>600?{letterSpacing:7}:{textAlign:'center'}} >OUR VISION</div>
                  <span className='fs-20 black-txt fw-500' style={size.width>600?{}:{textAlign:'center'}}>
                    <p>
                    We strive to lead destination management services in the UAE by offering the best travel and tourism services to our customers.
                    </p>
                  </span>
                </Col>
            </Row>
            </div>
        </Container>
      </div>  
      <div style={{backgroundColor:"white"}}>
        <Container className='py-3'>
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
                <>
                {/* {size.width>600 && <Col md={2}></Col> } */}
                {size.width>600 &&
                    <Col md={5} className='py-1'>
                    <div>
                        <img src={'images/uae-about-us.png'} style={{width:'32vw'}}  alt="About Us" />
                    </div>
                </Col>}
                </>
            </Row>
        </Container>
      <div className='py-4'></div>
      </div>
    </div>
  )
}

export default About