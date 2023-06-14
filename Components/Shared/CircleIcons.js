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
    <Container className='bar-styles'>
        <Row className="justify-content-md-center mt-4">
            <Col md={1}></Col>
            <Col md={2} xs={2} className='barz'>
            <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}}
                style={{textDecoration:"none", color:'black'}}
            >
                <img src={"/icons/new-circle (4).png"}  height={height} width={width} style={imgStyle} /> Theme Parks
                {/* <Row className="justify-content-md-center">
                    <Col md={2}><img src={"/icons/new-circle (4).png"}  height={height} width={width} style={imgStyle} /></Col>
                    <Col md={10} className='px-4'>Theme Parks</Col>
                </Row> */}
            </Link>
            </Col>
            <Col md={2} xs={2} className='barz'>
            <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Water Parks' }}}
                style={{textDecoration:"none", color:'black'}}
            >
                <img src={"/icons/new-circle (5).png"}  height={height} width={width} style={imgStyle} /> Water Parks
                {/* <Row className="justify-content-md-center">
                    <Col md={2}><img src={"/icons/new-circle (5).png"}  height={height} width={width} style={imgStyle} /></Col>
                    <Col md={10} className='px-4'>Water Parks</Col>
                </Row> */}
            </Link>
            </Col>
            <Col md={2} xs={2} className='barz'>
            <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Adventure' }}}
                style={{textDecoration:"none", color:'black'}}
            >
                <img src={"/icons/new-circle (1).png"}  height={height} width={width} style={imgStyle} /> Adventure
                {/* <Row className="justify-content-md-center">
                    <Col md={2}><img src={"/icons/new-circle (1).png"}  height={height} width={width} style={imgStyle} /></Col>
                    <Col md={10} className='px-4'>Adventure</Col>
                </Row> */}
            </Link>
            </Col>
            <Col md={2} xs={2} className='barz'>
            <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'City Tours' }}}
                style={{textDecoration:"none", color:'black'}}
            >
                <img src={"/icons/new-circle (2).png"}  height={height} width={width} style={imgStyle} /> City Tours
                {/* <Row className="justify-content-md-center">
                    <Col md={2}><img src={"/icons/new-circle (2).png"}  height={height} width={width} style={imgStyle} /></Col>
                    <Col md={10} className='px-4'>City Tours</Col>
                </Row> */}
            </Link>
            </Col>
            <Col md={2} xs={2} className='barz'>
            <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Luxury Tours' }}}
                style={{textDecoration:"none", color:'black'}}
            >
                <img src={"/icons/new-circle (3).png"}  height={height} width={width} style={imgStyle} /> Luxury Tours
                {/* <Row className="justify-content-md-center">
                    <Col md={2}><img src={"/icons/new-circle (3).png"}  height={height} width={width} style={imgStyle} /></Col>
                    <Col md={10} className='px-4'>Luxury Tours</Col>
                </Row> */}
            </Link>
            </Col>
            <Col md={1}></Col>
        </Row>
    {/* <Row className="justify-content-md-center">
        <Col md="auto" className='mx-4'> 
        <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}}
            style={{border:"1px solid black", padding:20}}
        >
            <img src='/icons/5.png' style={{height:height}} />
        </Link>
        </Col>
        <Col md="auto" className='mx-4'> 
        <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Water Parks' }}}>
            <img src='/icons/3.png' style={{height:height}} />
        </Link>
        </Col>
        <Col md="auto" className='mx-4'>
        <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'City Tours'  }}}>
            <img src='/icons/1.png' style={{height:height}} />
        </Link>
        </Col>
        <Col md="auto" className='mx-4'>
        <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Luxury Tours'}}}>
            <img src='/icons/4.png' style={{height:height}} />
        </Link>
        </Col>
        <Col md="auto" className='mx-4'>
        <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Adventure'   }}}>
            <img src='/icons/2.png' style={{height:height}} />
        </Link>
        </Col>
    </Row> */}
    </Container>
  )
}

export default CircleIcons
