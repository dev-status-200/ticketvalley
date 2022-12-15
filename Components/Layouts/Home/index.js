import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Aos from 'aos';
import { AiOutlineRight } from "react-icons/ai";

const Home = () => {

    useEffect(() => {
        Aos.init({duration:700});
    }, [])
    
    return (
    <div className='home-styles' data-aos="fade-in">
        <div className='hero'>
            <Row>
                <Col className='p-5' data-aos="slide-right">
                    <h1 className='text-shade' style={{fontSize:80, fontWeight:300, color:'white'}}>Plan With Us</h1>
                    <button className='custom-btn mt-3 shade'>Book Now <AiOutlineRight className='ico'/></button>
                </Col>
                <Col></Col>
            </Row>
        </div>
    </div>
  )
}

export default Home
