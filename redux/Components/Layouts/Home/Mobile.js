
import CircleMobileIcons from "/Components/Shared/CircleMobileIcons"
import React from 'react';
import { Container } from 'react-bootstrap';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";
import SignUp from '../../Shared/SignUp';
import dynamic from 'next/dynamic';
// const MobileVideo = dynamic(() => import('./MobileVideo'), {
//   loading: () => <div className='text-center'> <img src='/loader.svg' alt="Loader" /> </div>,
// })
const Adventures = dynamic(() => import('./AdventureTours'), {
  loading: () => <div className='text-center'> <img src='/loader.svg' alt="Loader" /> </div>,
})
const Combos = dynamic(() => import('./Combos'), {
  loading: () => <div className='text-center'> <img src='/loader.svg' alt="Loader" /> </div>,
})

const Mobile = ({combos, adventures, bestSelling}) => {
  return (
    <>
    <div fluid="true">
      {/* <MobileVideo/> */}
      <CircleMobileIcons/>
    </div>
    <div className=' bg-02' style={{backgroundColor:"white"}}>
      <Container className='my-5' data-aos='fade-up'>
        <h3 className='mt-3 fw-700 text-center'>ADVENTURES & TOUR<span className='blue-txt'> ACTIVITIES</span></h3>
        <Adventures/>
      </Container>
      <Container className='my-0 pb-5' data-aos='fade-up'>
        <h3 className=' fw-700 text-center'>COMBO TOUR<span className='blue-txt'>  ACTIVITIES</span></h3>
        <Combos/>
      </Container>
      <SignUp mobile={true} />
    </div>
    </>
  )
}

export default React.memo(Mobile)