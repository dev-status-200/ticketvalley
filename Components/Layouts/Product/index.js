import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { Container, Row, Col, Table  } from 'react-bootstrap';
import { AiFillTags, AiOutlineClockCircle, AiOutlinePrinter, AiOutlineCheckCircle } from "react-icons/ai";
import { Rate, Affix, Drawer } from 'antd';
import { IoCalendarSharp ,IoBagCheckOutline } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";
import { MdShoppingCart } from "react-icons/md";
import { FaShuttleVan } from "react-icons/fa";
import { IoFlashSharp } from "react-icons/io5";
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbArrowBackUp } from "react-icons/tb";
import Router from 'next/router';
import Aos from 'aos';
import Book from './Book';
import { useSelector } from 'react-redux';
import Details from './Details';
import NavLinks from '../../Shared/NavLinks';
import { TbPoint } from "react-icons/tb";
import CircleIcons from '/Components/Shared/CircleIcons';

const Product = ({id, tourData, transportData}) => {

  const cart = useSelector((state) => state.cart.value);
  const conversion = useSelector((state) => state.currency.conversion);

  const [tour, setTour] = React.useState({});
  const [transport, setTransport] = React.useState([]);
  const [open, setOpen] = useState(false);

  const [cartIndex, setCartIndex] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    Aos.init({duration:700});
    setTour(tourData)
    setTransport(transportData)
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll)
}, [])

  useEffect(() => {
    cart.forEach((x, i)=>{
      if(x.tourId==tourData.id){
          setAdded(true);
          setCartIndex(i)
      }
    })
  }, [cart])
  
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

      <div className='hero pt-4'>
        <div className='navBar'>
          <Link className='navLink' href='/'>HOME</Link>
          <Link className='navLink' href='/'>DESTINATION</Link>
          <span className="navLink">
            <img src={'/images/logo.png'} height={100} />
          </span>
          <div className='dropdown mx-2'>
            <span className='navLink dropbtn'>ACTIVITIES</span>
            <div className="dropdown-content">
                <NavLinks/>
            </div>
          </div>
          <Link className='navLink' href='/about'>ABOUT US</Link>
        </div>
        <div className='my-2 py-2'></div>
      </div>
      {/* <CircleIcons/> */}
      {Object.keys(tour).length>0 &&
      <div>
        <Container className='' data-aos="fade-up">
          <Row className='p'>
            <Col md={8} className='pt-5'>
              <Details tour={tour} />
            </Col>
            <Col md={4} >
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row className='mt-5'>
            <Col md={6} className='px-0 policies-box' style={{borderRight:'2px solid white'}}>
            <div className='pb-4'>
            <h3 className='my-3 wh-txt text-center'><b>Booking Policies</b></h3>
            {
              tour.policies.split("//").map((x, i)=>{
                return(
                <Row key={i} className="justify-content-md-center wh-txt">
                  <Col md={1}></Col>
                  <Col style={{minWidth:30, maxWidth:30}} md={'auto'}><TbPoint className='mx-1 mt-1 ' size={20} /></Col>
                  <Col className='my-1'><div className='fs-14'>{x}</div></Col>
                  <Col md={1}></Col>
                </Row>
                )
              })
            }
            </div>
            </Col>
            <Col md={6} className='px-0 policies-box' style={{borderRight:'2px solid white'}}>
            <div className='pb-4'>
            <h3 className='my-3 wh-txt text-center'><b>Cancellation Policies</b></h3>
            {
              tour.cancellation_polices.split("//").map((x, i)=>{
                return(
                <Row key={i} className="justify-content-md-center wh-txt">
                  <Col md={1}></Col>
                  <Col style={{minWidth:30, maxWidth:30}} md={'auto'}><TbPoint className='mx-1 mt-1 ' size={20} /></Col>
                  <Col className='my-1'><div className='fs-14'>{x}</div></Col>
                  <Col md={1}></Col>
                </Row>
                )
              })
            }
            </div>
            </Col>
          </Row>
        </Container>
        <div className='book normal-book'>
          <div className='booking-form'>
            <div className=''><span className='fw-400 fs-14 grey-txt'>Starting From</span></div>
            {tour.prevPrice && <s className='fw-400 fs-20' style={{color:"#af302c"}}>
              {" "}{(tour.prevPrice*conversion.rate).toFixed(2)} {conversion.currency}{" "}
            </s>}
            <p className='fw-600 fs-30'><AiFillTags/>
              {(tour.TourOptions[0].adult_price*conversion.rate).toFixed(2)} {conversion.currency} <span className='fw-400 fs-18 mx-2 grey-txt'>Per Person</span>
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
            {!added && 
            <div className="wrapper mt-4" onClick={showDrawer}>
              <div className='a'><span>BOOK NOW</span></div>
            </div>
            }
            {added && 
            <Row> 
              <hr/>
              <Col>
                <button className='view-more' onClick={()=>Router.push("/cart")}>
                  <TbArrowBackUp style={{position:'relative', bottom:1}} size={18} />
                  <span className='mx-1'>View More</span>
                </button>
              </Col>
              <Col>
                <button className='checkout-now' onClick={()=>Router.push("/cart")}>
                  <MdShoppingCart style={{position:'relative', bottom:2}} />
                  <span className='mx-1'>Checkout Now</span>
                </button>
              </Col> 
            </Row>
            }
            <Drawer style={{padding:'', margin:0, width:550, position:'relative', right:70}}
              title={`${tour.title} Options`}
              placement={"right"}
              onClose={onClose}
              open={open}
              width={470}
            ><Book tour={tour} transport={transport} setOpen={setOpen} />
            </Drawer>
          </div>
          <div className='mt-5'>
            <div className='tour-features pt-3 pb-1'>
            {/* <h2>{tour.title}</h2> */}
            <h5>Ticket Info</h5>
            </div>
          </div>
          <div className='tour-features-box my-3'>
            <div className='tour-features pt-3 pb-1'>
              <h5>Duration</h5>
            </div>
            <div className='tour-features-white pt-3 pb-1'>
              <h6>{tour.duration} </h6>
            </div>
          </div>
          <div className='tour-features-box my-3'>
            <div className='tour-features pt-3 pb-1'>
              <h5>Departure Point</h5>
            </div>
            <div className='tour-features-white pt-3 pb-1'>
              <h6>{tour.departure}</h6>
            </div>
          </div>
          <div className='tour-features-box my-3'>
            <div className='tour-features pt-3 pb-1'>
              <h5>Reporting Point</h5>
            </div>
            <div className='tour-features-white pt-3 pb-1'>
              <h6>{tour.reporting}</h6>
            </div>
          </div>
          <div className='tour-features-box my-3'>
            <div className='tour-features pt-3 pb-1'>
              <h5>Languages</h5>
            </div>
            <div className='tour-features-white pt-3 pb-1'>
              <h6>{tour.lang}</h6>
            </div>
          </div>
          <div className='tour-map-shadow py-0 my-0'>
          <iframe className="p-0 m-0"
            src="
            https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d275009.07292683737!2d55.04092028011636!3d25.090146614866875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1684318625828!5m2!1sen!2s
            " 
            width="100%" height="480">
          </iframe>
          </div>
        </div>
        {scrollPosition>650 &&
        <div className='fixed-book'>
          <button type='button'  onClick={showDrawer} className='otherBook-btn'>
            <b>            
              <div className='my-0 py-0'>BOOK</div>
              <div className='my-0 py-0'>NOW</div>
            </b>
          </button>
        </div>}
      </div>
      }
      { Object.keys(tour).length==0 && <div>Please wait...</div>}
    </div>
    </>
  )
}

export default Product