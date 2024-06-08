import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FiCheckSquare } from "react-icons/fi";
import { TbPoint } from "react-icons/tb";

const Details = ({tour, detail}) => {
  
  return (
    <>
      {Object.keys(detail).length>0 &&<>
      <div className='mt-4'>
        <h3 className='blue-txt'><b>Tour Detail</b></h3>
        <p className='fs-13 grey-txt'>
          {tour.tour_detail}
        </p>
      </div>
      <hr/>
      <div className=''>
        <h3 className='blue-txt'><b>Inclusions</b></h3>
        {detail.inclusions.split("//").map((x, i)=>{
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
        {detail.why_shoulds.split("//").map((x, i)=>{
          return(
          <Row key={i}>
            <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1 blue-txt' size={20} /></Col>
            <Col className='my-1'><div className='fs-13 grey-txt'>{x}</div></Col>
          </Row>
          )
        })}
      </div>
      {detail?.exclusions?.length>10 && <>
      <hr/>
      <div className=''>
        <h3 className='blue-txt'><b>Exclusions</b></h3>
        {detail?.exclusions?.split("//")?.map((x, i)=>{
          return(
          <Row key={i}>
            <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1 blue-txt' size={20} /></Col>
            <Col className='my-1'><div className='fs-13 grey-txt'>{x}</div></Col>
          </Row>
          )
        })}
      </div>
      </>}
      <hr/>
      <div className=''>
        <h3 className='blue-txt'><b>Important Information</b></h3>
        {
          detail.imp_infos.split("//").map((x, i)=>{
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
      </>}
    </>
  )
}
export default React.memo(Details)