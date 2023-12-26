import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Router from 'next/router';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Desktop = () => {
  return (
    <>
    <div className='footer-styles'>
        <div className='bgTop p-5'>
            <Container className='px-5 pt-3'>
                <Row>
                    <Col className='px-3'>
                        <h6 className='heading'>CONTACT INFO</h6>
                        <div className='my-4 mt-5 wh-txt'>
                        <span className=''><FaPhoneAlt style={{position:'relative', bottom:2}}/></span><span className='fs-16 mx-2'>+ 971  55 998 6370</span>
                        <div className='mb-4'> 
                            <span className=''><MdEmail style={{position:'relative', bottom:2}}/></span><span className='fs-16 mx-2'>info@ticketsvalley.com</span>
                        </div>
                        </div>
                    </Col>
                    <Col className='px-3'>
                        <div className='heading'>ABOUT US</div>

                        <p className='mt-5 wh-txt cur' onClick={()=>Router.push("/about")}>Our Story</p>
                    </Col>
                    <Col className='px-3'>
                        <div className='heading mb-5'>Social</div>
                        <FaFacebook className='wh-txt mx-2 cur fs-18' />
                        <FaInstagram className='wh-txt mx-2 cur fs-18' />
                        <FaSquareXTwitter className='wh-txt mx-2 cur fs-18' />
                        <FaLinkedin className='wh-txt mx-2 cur fs-18' />
                    </Col>
                    <Col className='px-3'>
                        <div className='heading'>PAY SAFELY WITH US</div>

                        <p className='mt-5 wh-txt'>The payment is encrypted and transmitted securely with an SSL protocol.</p>
                        <img src='/images/creditcard-logo.png' alt='credit card' />
                    </Col>
                </Row>
            </Container>
        </div>
        <div className='bgBt p-3 text-center wh-txt'>
        COPYRIGHT 2023 TICKETSVALLEY, ALL RIGHT RESERVED
        </div>
    </div>
    </>
  )
}

export default React.memo(Desktop)