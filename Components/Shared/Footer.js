import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className='footer-styles'>
        <div className='bgTop p-5'>
            <Container className='px-5 py-3'>
                <Row>
                    <Col className='px-3'>
                        <h6 className='heading'>CONTACT INFO</h6>
                        <div className='my-4 mt-5 wh-txt'>
                        <span className=''><FaPhoneAlt style={{position:'relative', bottom:2}}/></span><span className='fs-18 mx-2'>+41-21-634-05-05</span>
                        <div className='mb-4'> 
                            <span className=''><MdEmail style={{position:'relative', bottom:2}}/></span><span className='fs-18 mx-2'>info@ticketvalley.com</span>
                        </div>
                        <div>
                            <p className='grey-txt fs-18'>
                            © 2014-2022 Peaceland Travel & Tours All Rights Reserved.
                            </p>
                        </div>
                        </div>
                    </Col>
                    <Col className='px-3'>
                        <h6 className='heading'>ABOUT US</h6>

                        <p className='mt-5 wh-txt'>Our Story</p>
                        <hr className='my-0' style={{backgroundColor:'silver'}} />
                        <p className='mt-4 wh-txt'>Working With Us</p>
                        <hr className='my-0' style={{backgroundColor:'silver'}} />
                        <p className='mt-4 wh-txt'>Be Our Partner</p>
                        <hr className='my-0' style={{backgroundColor:'silver'}} />
                    </Col>
                    <Col className='px-3'>
                        <h6 className='heading'>SUPPORT</h6>

                        <p className='mt-5 wh-txt'>Customer Support</p>
                        <hr className='my-0' style={{backgroundColor:'silver'}} />
                        <p className='mt-4 wh-txt'>Privacy & Policy</p>
                        <hr className='my-0' style={{backgroundColor:'silver'}} />
                    </Col>
                    <Col className='px-3'>
                        <h6 className='heading'>PAY SAFELY WITH US</h6>

                        <p className='mt-5 wh-txt'>The payment is encrypted and transmitted securely with an SSL protocol.</p>
                        <img src='/images/creditcard-logo.png' />
                    </Col>
                </Row>
            </Container>
        </div>
        <div className='bgBt p-3 text-center grey-txt'>
        COPYRIGHT 2022 PEACELAND, ALL RIGHT RESERVED
        </div>
    </div>
  )
}

export default Footer