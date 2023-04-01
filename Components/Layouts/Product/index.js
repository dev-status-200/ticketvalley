import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { Container, Row, Col, Table  } from 'react-bootstrap';
import { AiFillTags, AiOutlineClockCircle, AiOutlinePrinter, AiOutlineCheckCircle } from "react-icons/ai";
import { Rate, Affix, Drawer } from 'antd';
import { IoCalendarSharp } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";
import { FaShuttleVan } from "react-icons/fa";
import { IoFlashSharp } from "react-icons/io5";
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbLanguageHiragana } from "react-icons/tb";
import Aos from 'aos';
import Book from './Book';
import { useSelector } from 'react-redux';
import Details from './Details';

const Product = ({id, tourData, transportData}) => {

  const conversion = useSelector((state) => state.currency.conversion);
  const [tour, setTour] = React.useState({});
  const [transport, setTransport] = React.useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Aos.init({duration:700});
    setTour(tourData)
    setTransport(transportData)
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll)
}, [])
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
    <div className='tour-styles' style={{backgroundColor:'white'}} >
      <div className='hero py-4'>
        <div className='navBar'>
          <Link className='navLink' href='/'>HOME</Link>
          <Link className='navLink' href='/'>DESTINATION</Link>
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
          <Link className='navLink' href='/about'>ABOUT US</Link>
        </div>
        <div className='my-5 py-3'></div>
      </div>
      {Object.keys(tour).length>0 &&
      <div>
        <Container className='' data-aos="fade-up">
          <Row className='py-4'>
            <Col md={8}>
              <Details tour={tour} />
            </Col>
            <Col md={4} >
            </Col>
          </Row>
        </Container>
        <div className={`book ${scrollPosition>450?' fixed-book':'normal-book'}`}>
          <div className='booking-form'>
            <p className='fw-600 fs-20'>{tour.category}</p>
            <div className=''><span className='fw-400 fs-18 grey-txt'>Starting From</span></div>
            {tour.prevPrice && <s className='fw-400 fs-20' style={{color:"#af302c"}}>
              {" "}{(tour.prevPrice*conversion.rate).toFixed(2)} {conversion.currency}{" "}
            </s>}
            <p className='fw-600 fs-30'><AiFillTags/>
              {(tour.adult_price*conversion.rate).toFixed(2)} {conversion.currency} <span className='fw-400 fs-18 mx-2 grey-txt'>Per Person</span>
            </p>
            <div className='my-2'>
              <span className='info-logo'><IoCalendarSharp/></span>
              <span className='info-text'>Availability: {tour.availability}</span><br/>
              <span className='info-logo'><GiSandsOfTime/></span>
              <span className='info-text'>Duration: {tour.duration}</span><br/>
              <span className='info-logo'><AiOutlineClockCircle/></span>
              <span className='info-text'>{tour.time_slot}</span><br/>
              {tour.transport &&<>
                <span className='info-logo'><FaShuttleVan/></span>
                <span className='info-text'>{tour.transport}</span>
                <br/>
              </>}
              
              <span className='info-logo'><IoFlashSharp/></span>
              <span className='info-text'>{tour.confirmation}</span><br/>
              <span className='info-logo bt-2'><RiExchangeFundsLine/></span>
              <span className='info-text'>Refund: {tour.refund}</span><br/>
              <span className='info-logo bt-2'><AiOutlinePrinter/></span>
              <span className='info-text'>{tour.voucher}</span><br/>
            </div>

            {/* <Book tour={tour} transport={transport} /> */}

            <div className="wrapper mt-4" onClick={showDrawer}>
              <div className='a'><span>BOOK NOW</span></div>
            </div>

            <Drawer style={{padding:'', margin:0, width:450, position:'relative', right:70}}
              title={`${tour.title} Options`}
              placement={"right"}
              onClose={onClose}
              open={open}
            >
              <Book tour={tour} transport={transport} />
            </Drawer>
          </div>
        </div>
      </div>
      }
      {
        Object.keys(tour).length==0 && <div>Please wait...</div>
      }
    </div>
    </>
  )
}

export default Product