import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const CircleIcons = () => {
    const height = 15;
    const width = 15;
    const imgStyle = {
        position:"relative",
        bottom:2
    }
    const navStyles = {textDecoration:"none", color:'black'}
  return (
    <Container className='bar-styles'>
        <Row className='justify-content-xs-center'>
            <Col className='barz-mobile'>
            <Link 
                href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}}
                style={navStyles}
            >
                <img src={"/icons/new-circle (4).png"}  height={height} width={width} style={imgStyle} />
            </Link>
            </Col>
            <Col className='barz-mobile'>
            <Link 
                href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Water Parks' }}}
                style={navStyles}
            >
                <img src={"/icons/new-circle (5).png"}  height={height} width={width} style={imgStyle} />
            </Link>
            </Col>
            <Col className='barz-mobile'>
            <Link 
                href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Adventure' }}}
                style={navStyles}
            >
                <img src={"/icons/new-circle (1).png"}  height={height} width={width} style={imgStyle} />
            </Link>
            </Col>
            <Col className='barz-mobile'>
            <Link 
                href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'City Tours' }}}
                style={navStyles}
            >
                <img src={"/icons/new-circle (2).png"}   height={height} width={width} style={imgStyle} />
            </Link>
            </Col>
            <Col className='barz-mobile'>
            <Link 
                href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Luxury Tours' }}}
                style={navStyles}
            >
                <img src={"/icons/new-circle (3).png"}  height={height} width={width} style={imgStyle} />
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
        {/* <Row className="justify-content-md-center mt-4">

            <Col md={2} xs={2} className='barz'>
            <Link 
                style={{textDecoration:"none", color:'black'}}
            >
                  height={height} width={width} style={imgStyle} /> Water Parks
            </Link>
            </Col>
            <Col  className='barz'>
            <Link 
                style={{textDecoration:"none", color:'black'}}
            >
                  height={height} width={width} style={imgStyle} /> Adventure
            </Link>
            </Col>
            <Col className='barz'>
            <Link 
                style={{textDecoration:"none", color:'black'}}
            >
                 height={height} width={width} style={imgStyle} /> City Tours
            </Link>
            </Col>
            <Col  className='barz'>
            <Link 
                style={{textDecoration:"none", color:'black'}}
            >
                  height={height} width={width} style={imgStyle} /> Luxury Tours
            </Link>
            </Col>
        </Row> */}
    </Container>
  )
}

export default CircleIcons
