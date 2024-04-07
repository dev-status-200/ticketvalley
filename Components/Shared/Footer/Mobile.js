import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Mobile = () => {
  return (
    <div className='footer-styles'>
      <div style={{minHeight:100}} className='bgTop'>
        <Row>
          <Col md={12} className='text-center'>
          <div className='my-3 wh-txt'>
            <span className=''><FaPhoneAlt style={{position:'relative', bottom:2}}/></span><span className='fs-20 mx-2'>+ 971  55 998 6370</span>
            <div className=''> 
                <span className=''><MdEmail style={{position:'relative', bottom:2}}/></span><span className='fs-18 mx-2'>info@peacelandtravel.com</span>
            </div>
            </div>
          </Col>
          <Col md={12} className='py-3 px-5 text-center'>
            <div className='heading'>PAY SAFELY WITH US</div>

            <p className='wh-txt'>The payment is encrypted and transmitted securely with an SSL protocol.</p>
            <img src='/images/creditcard-logo.png' alt='credit card' />
          </Col>
        </Row>
      </div>
      <div style={{}} className='bgBt text-center py-2'>
        <div className='wh-txt fs-12'>COPYRIGHT 2023 PEACELAND TRAVEL, ALL RIGHT RESERVED</div>
      </div>
    </div>
  )
}

export default React.memo(Mobile)