import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const CircleIcons = () => {
    const height = 120
  return (
    <Container>
    <Row className="justify-content-md-center pt-5">
        <Col md="auto" className='mx-4'> 
        <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}}>
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
    </Row>
</Container>
  )
}

export default CircleIcons
