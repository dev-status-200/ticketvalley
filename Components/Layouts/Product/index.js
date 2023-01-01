import React from 'react';
import Link from 'next/link'
import { Container, Row, Col, Table  } from 'react-bootstrap';
import { AiFillTags, AiOutlineClockCircle, AiOutlinePrinter, AiOutlineCheckCircle } from "react-icons/ai";
import { MdPeopleAlt } from "react-icons/md";
import { Rate } from 'antd';
import { IoCalendarSharp } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";
import { FaShuttleVan } from "react-icons/fa";
import { IoFlashSharp } from "react-icons/io5";
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbLanguageHiragana, TbPoint } from "react-icons/tb";
import Carasoul from './Carasoul';
import { useRouter } from 'next/router';
import data from '../../../data.json'

const Product = () => {

  const [tour, setTour] = React.useState({

  })

  const router = useRouter();
  const {id} = router.query;
  React.useEffect(() => {
    data.forEach((x)=>{
      if(id==x.id){
        setTour(x);
      }
    })
  }, [])
  
  return (
    <div className='tour-styles' style={{backgroundColor:'white'}}>
      <div className='hero py-4'>
        {/* Header */}
        <div className='navBar'>
          <Link className='navLink' href='/'>HOME</Link>
          <Link className='navLink' href='/'>DESTINATION</Link>
          <span className="navLink">
            <img src={'/images/logo.png'} height={100} />
          </span>
          <Link className='navLink' href='/'>TOURS</Link>
          <Link className='navLink' href='/'>CONTACT</Link>
        </div>
        <div className='my-5 py-3'></div>
      </div>
      <div className='section-nav-container'>
        <Container className='px-5'> 
          <div className='section-nav'>Detail</div>
          <div className='section-nav'>Rates</div>
          <div className='section-nav'>Inclusions</div>
          <div className='section-nav'>Timings</div>
          <div className='section-nav'>Important Info</div>
        </Container>
      </div>
      {Object.keys(tour).length>0 &&
      <div>
        <Container className='px-5'>
          <Row className='py-4'>
            <Col md={8}>
              <img src={tour.mainPic} style={{borderRadius:4, width:'47vw'}}  />
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
                    <span className='info-text'>{tour.time}</span>
                  </Col>
                  <Col >
                    <span className='info-logo'><AiOutlineClockCircle/></span>
                    <span className='info-text'>{tour.btw}</span>
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
                      <Col><span className='info-text'>Instant Confirmation</span></Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col md={2}><span className='info-logo bt-2'><RiExchangeFundsLine/></span></Col>
                      <Col><span className='info-text'>Non Refundable</span></Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col md={2}><span className='info-logo bt-2'><AiOutlinePrinter/></span></Col>
                      <Col><span className='info-text'>Printed Voucher Acepted</span></Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col md={2}><span className='info-logo bt-2'><TbLanguageHiragana /></span></Col>
                      <Col><span className='info-text'>English <span className='fs-13'>{"("}Optional{")"}</span></span></Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>Tour Detail</h3>
                <p className='fs-18'>
                  Museum of the Future is not just another museum devoted to contemporary creativity, but much beyond that.
                  Employing the latest in design, prototyping, and technological advancements,
                  the museum - just as the name says - is solely developed to craft the real next-generation exhibits that will journey you 50 years into the future.
                  It is where you get to discover the future of ever-dynamic science and innovation within its striking ring-like structure with a vast open center.
                </p>
                <p className='fs-18'>
                  Sprawling over 30,000 square meters, each of the museum{"’"}s seven floors appears like a movie set from the cutting-edge future.
                  They will transport you to the year 2071 and beyond. With everything from innovative space stations,
                  stupefying DNA library and a futuristic spa to the most progressive in ecology, wellness, and spirituality,
                  it lets you experience all that you have envisioned in a sci-fi magazine or movie. 
                </p>
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>Inclusions</h3>
                <p className='fs-18'>
                  <AiOutlineCheckCircle className='mx-3 mb-1' color='green' />
                  Museum of the Future entry ticket
                </p>
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>Why Should I go for This?</h3>
                  <Row>
                    <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                    <Col><p className='fs-18'>Museum of the Future entry ticket</p></Col>
                  </Row>
                  <Row>
                    <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                    <Col><p className='fs-18'>Walk into the future and straight to the year 2071 as you discover the museum packed with the most ground-breaking exhibits across its seven floors that span over 30,000 square meters.</p></Col>
                  </Row>
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>More Pictures</h3>
                <Carasoul images={tour.images}/>
              </div>
              <hr/>
              <div className='my-5 py-2'>
                <h3 className='my-4'>Museum of the Future Tickets Timings</h3>
                <Table responsive="sm" style={{border:'1px solid #5184c8'}}>
                  <thead>
                    <tr style={{textAlign:'center'}}>
                      <th>Duration</th>
                      <th>Departure Point</th>
                      <th>Reporting Point</th>
                      <th style={{minWidth:130}}>Tour Language</th>
                      <th>Meals</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{textAlign:'center'}}>
                      <td style={{maxWidth:150}}>2 Hours {"("}Approx{")"}</td>
                      <td style={{maxWidth:150}}>10.00 AM - 7.30 PM</td>
                      <td style={{maxWidth:150}}>Sheikh Zayed Rd - Trade Centre - Trade Centre 2 - Dubai - United Arab Emirates</td>
                      <td style={{maxWidth:150}}>English</td>
                      <td style={{maxWidth:150}}></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>Important Information</h3>
                  <Row>
                    <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                    <Col><p className='fs-18'>The Booking Confirmation is valid only for a specific date and time.</p></Col>
                  </Row>
                  <Row>
                    <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                    <Col><p className='fs-18'>The transfer will be provided from centrally located hotels and residences in Dubai city. {"("}Deira, Bur Dubai, Sheikh Zayed, Marina{")"}</p></Col>
                  </Row>
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>Booking Policy</h3>
                  <Row>
                    <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                    <Col><p className='fs-18'>In case Tours or Tickets cancelled after Booking 100 % charges will be applicable.</p></Col>
                  </Row>
                  <Row>
                    <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                    <Col><p className='fs-18'>Children under 4 years will be considered as children and entry will be free of cost.</p></Col>
                  </Row>
                  <Row>
                    <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                    <Col><p className='fs-18'>Children above 4 years will be charged Adult Rates.</p></Col>
                  </Row>
              </div>
            </Col>
            <Col md={4}>
              <div className='booking-form'>
                <p className='fw-600 fs-20'>Best Seller</p>
                <p className='fw-600 fs-30'><AiFillTags/> 739.99 AED</p>
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