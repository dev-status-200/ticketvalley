import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const CircleIcons = ({bg}) => {

    const height = 15, width = 15;

    const imgStyle = {
        position:"relative",
        bottom:2
    };
    const navStyles = {textDecoration:"none", color:'black'};

  return (
    <Container className='bar-styles' style={bg=="none"?{}:{backgroundColor:'white'}}>
        <Row className='justify-content-xs-center'>
            <Col className='barz-mobile'>
            <Link 
                href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}}
                style={navStyles}
            >
                <img src={"/icons/new-circle (4).png"}  height={height} width={width} style={imgStyle} alt="Theme Parks" />
            </Link>
            </Col>
            <Col className='barz-mobile'>
            <Link 
                href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Water Parks' }}}
                style={navStyles}
            >
                <img src={"/icons/new-circle (5).png"}  height={height} width={width} style={imgStyle} alt="Water Parks" />
            </Link>
            </Col>
            <Col className='barz-mobile'>
            <Link 
                href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Adventure' }}}
                style={navStyles}
            >
                <img src={"/icons/new-circle (1).png"}  height={height} width={width} style={imgStyle}  alt="Adventure"/>
            </Link>
            </Col>
            <Col className='barz-mobile'>
            <Link 
                href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'City Tours' }}}
                style={navStyles}
            >
                <img src={"/icons/new-circle (2).png"}   height={height} width={width} style={imgStyle} alt="City Tours" />
            </Link>
            </Col>
            <Col className='barz-mobile'>
            <Link 
                href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Luxury Tours' }}}
                style={navStyles}
            >
                <img src={"/icons/new-circle (3).png"}  height={height} width={width} style={imgStyle} alt="Luxury Tours" />
            </Link>
            </Col>
        </Row>
        <Row className='justify-content-xs-center'>
            <Col className='text-center' style={{lineHeight:1, fontSize:10}}>Theme Parks</Col>
            <Col className='text-center' style={{lineHeight:1, fontSize:10}}>Water Parks</Col>
            <Col className='text-center' style={{lineHeight:1, fontSize:10}}>Adventure Tours</Col>
            <Col className='text-center' style={{lineHeight:1, fontSize:10}}>City Based Tours</Col>
            <Col className='text-center' style={{lineHeight:1, fontSize:10}}>Luxury Tours</Col>
        </Row>
    </Container>
  )
}

export default React.memo(CircleIcons)