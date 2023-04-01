import React from 'react';
import { Container, Row, Col, Table  } from 'react-bootstrap';
import { AiFillTags, AiOutlineClockCircle, AiOutlinePrinter, AiOutlineCheckCircle } from "react-icons/ai";
import { Rate } from 'antd';
import { TbPoint } from "react-icons/tb";
import Carasoul from './Carasoul';

const Details = ({tour}) => {
  return (
    <div>
        <img src={tour.main_image} style={{borderRadius:4, width:'60vw'}}  />
              <div className='mt-5 fs-30 fw-700'>{tour.title}</div>
              <span><Rate disabled defaultValue={5} /></span>
              <span className='mx-3 fs-18' style={{color:'grey'}}>{"("}3 Reviews{")"}</span>
              <hr/>
              <div className='my-5'>
                <h3 className='my-3'>Tour Detail</h3>
                <p className='fs-16 grey-txt'>
                  {tour.tour_detail}
                </p>
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>Inclusions</h3>

                {tour.inclusions.split("//").map((x, i)=>{
                  return(
                  <Row key={i}>
                    <Col style={{minWidth:30, maxWidth:30}}><AiOutlineCheckCircle className='mx-1 mt-1' color='green' /></Col>
                    <Col className='my-1'><div className='fs-16 grey-txt'>{x}</div></Col>
                  </Row>
                  )
                })}
              </div>
              <hr/>
              <div className='my-5'>
                <h3 className='my-4'>Why Should I go for This?</h3>
                {tour.why_shoulds.split("//").map((x, i)=>{
                  return(
                  <Row key={i}>
                    <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                    <Col className='my-1'><div className='fs-16 grey-txt'>{x}</div></Col>
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
                    <tr style={{textAlign:'center'}} className="grey-txt">
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
                    <Col className='my-1'><div className='fs-16 grey-txt'>{x}</div></Col>
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
                      <Col className='my-1'><div className='fs-16 grey-txt'>{x}</div></Col>
                    </Row>
                    )
                  })
                }
              </div>
              <hr/>
              {tour.terms_conditions.length>5 && <>
              <div className='my-5'>
                <h3 className='my-4'>Terms & Conditions</h3>
                {
                  tour.terms_conditions.split("//").map((x, i)=>{
                    return(
                    <Row key={i}>
                      <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                      <Col className='my-1'><div className='fs-16 grey-txt'>{x}</div></Col>
                    </Row>
                    )
                  })
                }
              </div>
              <hr/>
              </>}
              <div className='my-5'>

                <h3 className='my-4'>Cancellation Policies</h3>
                {
                  tour.cancellation_polices.split("//").map((x, i)=>{
                    return(
                    <Row key={i}>
                      <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1' color='green' /></Col>
                      <Col className='my-1'><div className='fs-16'>{x}</div></Col>
                    </Row>
                    )
                  })
                }
              </div>
    </div>
  )
}

export default Details
