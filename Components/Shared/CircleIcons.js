import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const CircleIcons = () => {
    const height = 15;
    const width = 15;
    const imgStyle = {
        position:"relative",
        bottom:2
    }
  return (
    <Container className='bar-styles text-center'>
        <Row className="justify-content-md-center pt-4">
            <Col md={1}></Col>
            <Col md={2} className='barz'>
            <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}}
                style={{textDecoration:"none", color:'black'}}
            ><img src={"/icons/new-circle (4).png"}  height={height} width={width} style={imgStyle} alt='Theme Parks' /> Theme Parks
            </Link>
            </Col>
            <Col md={2} className='barz'>
            <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Water Parks' }}}
                style={{textDecoration:"none", color:'black'}}
            ><img src={"/icons/new-circle (5).png"}  height={height} width={width} style={imgStyle} alt='Water Parks' /> Water Parks
            </Link>
            </Col>
            <Col md={2}  className='barz'>
            <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Adventure' }}}
                style={{textDecoration:"none", color:'black'}}
            ><img src={"/icons/new-circle (1).png"}  height={height} width={width} style={imgStyle} alt='Adventure' /> Adventure

            </Link>
            </Col>
            <Col md={2}  className='barz'>
            <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'City Tours' }}}
                style={{textDecoration:"none", color:'black'}}
            ><img src={"/icons/new-circle (2).png"}  height={height} width={width} style={imgStyle} alt='City Tours' /> City Tours

            </Link>
            </Col>
            <Col md={2} className='barz'>
            <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Luxury Tours' }}}
                style={{textDecoration:"none", color:'black'}}
            ><img src={"/icons/new-circle (3).png"}  height={height} width={width} style={imgStyle} alt='Luxury Tours' /> Luxury Tours
            </Link>
            </Col>
            <Col md={1}></Col>
        </Row>
    </Container>
  )
}

export default React.memo(CircleIcons)
