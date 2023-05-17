import React, { useEffect, useState } from 'react';
import { Row, Col, Table  } from 'react-bootstrap';
import { AiOutlineCheckCircle, AiOutlineCheckSquare } from "react-icons/ai";
import { FiCheckSquare } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { Rate } from 'antd';
import { TbPoint } from "react-icons/tb";
// import Carasoul from './Carasoul';

const Details = ({tour}) => {
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    let tempImages = [...tour.more_images.split(",")];
    tempImages.unshift(tour.main_image)
    setImages(tempImages)
    setMainImage(tour.main_image)
  }, [tour])
  
  return (
    <div>
      <div className=' fs-30 fw-700 blue-txt'>{tour.title}</div>
      <span><Rate disabled defaultValue={5} style={{fontSize:12, color:'orange'}} /></span>
      <span className='mx-2 fs-12' style={{color:'grey'}}>{"("}3 Reviews{")"}</span> 
      <IoLocationSharp size={15} style={{position:'relative', bottom:2}}/> {tour.destination.toUpperCase()}, {tour.city}
      {/* <hr/> */}
      <img className='my-3' src={mainImage} style={{borderRadius:23, width:'60vw', height:400}} />
      <Row>
        {images.map((x, i)=>{
          return(
            <Col key={i} md={3}  onClick={()=>setMainImage(x)}>
              <img src={x} className='img-hover' style={{width:'14vw', borderRadius:20, height:100}} />
            </Col>
          )
        })}
      </Row>
      <div className='mt-4'>
        <h3 className='blue-txt'><b>Tour Detail</b></h3>
        <p className='fs-13 grey-txt'>
          {tour.tour_detail}
        </p>
      </div>
      <hr/>
      <div className=''>
        <h3 className='blue-txt'><b>Inclusions</b></h3>

        {tour.inclusions.split("//").map((x, i)=>{
          return(
          <Row key={i}>
            <Col style={{minWidth:30, maxWidth:30}}>
              <FiCheckSquare className='mx-1 mt-2 blue-txt' size={15} style={{position:'relative', bottom:2}} />
            </Col>
            <Col className='my-1'><div className='fs-13 grey-txt'>{x}</div></Col>
          </Row>
          )
        })}
      </div>
      <hr/>
      <div className=''>
        <h3 className=' blue-txt'><b>Why Should I go for This?</b></h3>
        {tour.why_shoulds.split("//").map((x, i)=>{
          return(
          <Row key={i}>
            <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1 blue-txt' size={20} /></Col>
            <Col className='my-1'><div className='fs-13 grey-txt'>{x}</div></Col>
          </Row>
          )
        })}
      </div>
      {/* <hr/>
      <div className='my-5 py-2'>
        <h3 className='mt-4 blue-txt'><b>Timings</b></h3>
        <Table responsive="sm" style={{border:'1px solid #0d6788ea'}}>
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
      </div> */}
      <hr/>
      <div className=''>
        <h3 className='blue-txt'><b>Important Information</b></h3>
        {
          tour.imp_infos.split("//").map((x, i)=>{
            return(
          <Row key={i}>
            <Col style={{minWidth:30, maxWidth:30}}>
              <TbPoint className='mx-1 mt-1 blue-txt' size={20} /></Col>
            <Col className='my-1'><div className='fs-13 grey-txt'>{x}</div></Col>
          </Row>
            )
          })
        }
      </div>
      {/* <hr/>
      <div className='my-5'>
        <h3 className='mt-4 blue-txt'><b>Booking Policy</b></h3>
        {
          tour.policies.split("//").map((x, i)=>{
            return(
            <Row key={i}>
              <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1 blue-txt' size={20} /></Col>
              <Col className='my-1'><div className='fs-16 grey-txt'>{x}</div></Col>
            </Row>
            )
          })
        }
      </div> */}
      {tour.terms_conditions.length>5 && <hr/>}
      {tour.terms_conditions.length>5 && <>
      <div className='my-5'>
        <h3 className='mt-4 blue-txt'><b>Terms & Conditions</b></h3>
        {
          tour.terms_conditions.split("//").map((x, i)=>{
            return(
            <Row key={i}>
              <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1 blue-txt' size={20} /></Col>
              <Col className='my-1'><div className='fs-16 grey-txt'>{x}</div></Col>
            </Row>
            )
          })
        }
      </div>
      </>}
      {/* <div className='my-5'>

        <h3 className='mt-4 blue-txt'><b>Cancellation Policies</b></h3>
        {
          tour.cancellation_polices.split("//").map((x, i)=>{
            return(
            <Row key={i}>
              <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1 blue-txt' size={20} /></Col>
              <Col className='my-1'><div className='fs-16'>{x}</div></Col>
            </Row>
            )
          })
        }
      </div> */}
    </div>
  )
}
export default Details