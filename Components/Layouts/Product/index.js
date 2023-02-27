import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { Container, Row, Col, Table  } from 'react-bootstrap';
import { AiFillTags, AiOutlineClockCircle, AiOutlinePrinter, AiOutlineCheckCircle } from "react-icons/ai";
import { Rate, Affix } from 'antd';
import { IoCalendarSharp } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";
import { FaShuttleVan } from "react-icons/fa";
import { IoFlashSharp } from "react-icons/io5";
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbLanguageHiragana, TbPoint } from "react-icons/tb";
import Carasoul from './Carasoul';
import Aos from 'aos';
import Book from './Book';
import { useSelector } from 'react-redux';

const Product = ({id, tourData, transportData}) => {

  const conversion = useSelector((state) => state.currency.conversion);
  const [tour, setTour] = React.useState({})
  const [transport, setTransport] = React.useState([])

  useEffect(() => {
    Aos.init({duration:700});
    setTour(tourData)
    setTransport(transportData)
}, [])
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      //console.log(position)
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <div className='tour-styles' style={{backgroundColor:'white'}} >
      <div className='hero py-4'>
        {/* Header */}
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
        <Container className='px-5' data-aos="fade-up">
          <Row className='py-4'>
            <Col md={8}>
              <img src={tour.main_image} style={{borderRadius:4, width:'47vw'}}  />
              <div className='mt-5 fs-30 fw-700'>{tour.title}</div>
              <span><Rate disabled defaultValue={5} /></span>
              <span className='mx-3 fs-18'>{"("}3 Reviews{")"}</span>
              <div className='my-4'>
                <Row>
                  <Col >
                    <span className='info-logo'><IoCalendarSharp/></span>
                    <span className='info-text'>{tour.availability}</span>
                  </Col>
                  <Col >
                    <span className='info-logo'><GiSandsOfTime/></span>
                    <span className='info-text'>{tour.duration}</span>
                  </Col>
                  <Col >
                    <span className='info-logo'><AiOutlineClockCircle/></span>
                    <span className='info-text'>{tour.time_slot}</span>
                  </Col>
                  <Col >
                    <span className='info-logo'><FaShuttleVan/></span>
                    <span className='info-text'>{tour.transport}</span>
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col>
                    <Row>
                      <Col md={2}><span className='info-logo bt-2'><IoFlashSharp/></span></Col>
                      <Col><span className='info-text'>{tour.confirmation}</span></Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col md={2}><span className='info-logo bt-2'><RiExchangeFundsLine/></span></Col>
                      <Col><span className='info-text'>Refund {tour.refund}</span></Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col md={2}><span className='info-logo bt-2'><AiOutlinePrinter/></span></Col>
                      <Col><span className='info-text'>{tour.voucher}</span></Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col md={2}><span className='info-logo bt-2'><TbLanguageHiragana /></span></Col>
                      <Col><span className='info-text'>{tour.lang}</span></Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>Tour Detail</h3>
                <p className='fs-18'>
                  {tour.tour_detail}
                </p>
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>Inclusions</h3>
                {
                  tour.inclusions.split("//").map((x, i)=>{
                    return(
                    <p className='fs-18' key={i}>
                      <AiOutlineCheckCircle className='mx-3 mb-1' color='green' />
                      {x}
                    </p>
                    )
                  })
                }
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>Why Should I go for This?</h3>
                {tour.why_shoulds.split("//").map((x, i)=>{
                  return(
                  <Row key={i}>
                    <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                    <Col><p className='fs-18'>{x}</p></Col>
                  </Row>
                  )
                })}
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>More Pictures</h3>
                  <Carasoul images={tour.more_images}/>
              </div>
              <hr/>
              <div className='my-5 py-2'>
                <h3 className='my-4'>{tour.title} Timings</h3>
                <Table responsive="sm" style={{border:'1px solid #5184c8'}}>
                  <thead>
                    <tr style={{textAlign:'center'}}>
                      <th>Duration</th>
                      <th>Departure Point</th>
                      <th>Reporting Point</th>
                      <th style={{minWidth:130}}>Tour Language</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{textAlign:'center'}}>
                      <td style={{maxWidth:150}}>{tour.duration}</td>
                      <td style={{maxWidth:150}}>{tour.departure}</td>
                      <td style={{maxWidth:150}}>{tour.reporting}</td>
                      <td style={{maxWidth:150}}>{tour.lang}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>Important Information</h3>
                {
                  tour.imp_infos.split("//").map((x, i)=>{
                    return(
                  <Row key={i}>
                    <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                    <Col><p className='fs-18'>{x}</p></Col>
                  </Row>
                    )
                  })
                }
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>Booking Policy</h3>
                {
                  tour.policies.split("//").map((x, i)=>{
                    return(
                    <Row key={i}>
                      <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                      <Col><p className='fs-18'>{x}</p></Col>
                    </Row>
                    )
                  })
                }
              </div>
              <hr/>
              <div className='my-5'>

                <h3 className='my-4'>Terms & Conditions</h3>
                {
                  tour.terms_conditions.split("//").map((x, i)=>{
                    return(
                    <Row key={i}>
                      <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                      <Col><p className='fs-18'>{x}</p></Col>
                    </Row>
                    )
                  })
                }
              </div>
              <hr/>
              <div className='my-5'>

                <h3 className='my-4'>Cancellation Policies</h3>
                {
                  tour.cancellation_polices.split("//").map((x, i)=>{
                    return(
                    <Row key={i}>
                      <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                      <Col><p className='fs-18'>{x}</p></Col>
                    </Row>
                    )
                  })
                }
              </div>
            </Col>
            <Col md={4}>
              <div className='booking-form'>
                <div className='fw-300 fs-15'>Cateory</div>
                <p className='fw-600 fs-20'>{tour.category}</p>
                <div className=''><span className='fw-400 fs-18 grey-txt'>Starting From</span></div>
                {tour.prevPrice && <s className='fw-400 fs-20' style={{color:"#af302c"}}>
                  {" "}{(tour.prevPrice*conversion.rate).toFixed(2)} {conversion.currency}{" "}
                </s>}
                <p className='fw-600 fs-30'><AiFillTags/>
                  {(tour.adult_price*conversion.rate).toFixed(2)} {conversion.currency} <span className='fw-400 fs-18 mx-2 grey-txt'>Per Person</span>
                </p>
                <Book tour={tour} transport={transport} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      }
      {
        Object.keys(tour).length==0 && <div>Please wait...</div>
      }
    </div>
  )
}

export default Product