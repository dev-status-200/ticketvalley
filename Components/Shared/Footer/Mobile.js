import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from 'next/link';
import { notification } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { FaShieldAlt } from "react-icons/fa";

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
          <Col md={12} className='px-5 text-center'>
            <p className='wh-txt'>
              <div className='mb-2'>
                <b className='mb-2 fs-18'>Our Address</b>
              </div>
              <div className='fw-300 fs-18'>Office # 302, Royal Plaza Bdg Opposite ADCB Bank Al Rigga Road, Deira - 1 B St Dubai-UAE</div>
              <div className='fs-18'><b>Tell:</b> +971 4 255 5356</div>
            </p>
          </Col>
          <Col md={12}>
          <Col className='px-4 text-center my-3'>
            <h2 className='wh-txt'>Follow us on</h2>
            <div className='social-links-mobile'>
              <div className='social-white'>
                <Link href={'https://www.facebook.com/ticketsvalley'} target='_blank'>
                  <img src='icons/facebook.png' height={22} />
                </Link>
                <Link href="https://www.instagram.com/ticketsvalley/" target='_blank'>
                  <img src='icons/insta.png' height={22} />
                </Link>
                <Link href="https://www.linkedin.com/company/tickets-valley/" target='_blank'>
                  <img src='icons/linked.png' height={22} />
                </Link>
              </div>
            </div>
            <div className='heading mt-3'>PAY SAFELY WITH US</div>
            <img src='/images/creditcard-logo.png' alt='credit card' />
            <div className='wh-txt'>
              <FaShieldAlt color='gold' className='mb-1 mx-2' />
              Strip protected payement gateway
            </div>
          </Col>
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