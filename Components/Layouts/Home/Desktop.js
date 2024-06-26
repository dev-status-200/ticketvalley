import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Aos from 'aos';
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import SignUp from '../../Shared/SignUp';
import CircleIcons from '/Components/Shared/CircleIcons';
import dynamic from 'next/dynamic';

const VideoComp = dynamic(() => import('./VideoComp'), { ssr: false })
const BestSelling = dynamic(() => import('./BestSelling'), { ssr: false })
const Adventures = dynamic(() => import('./AdventureTours'), { ssr: false })
const Combos = dynamic(() => import('./Combos'), { ssr: false })
const PromoSection = dynamic(() => import('/Components/Shared/PromoSection'), { ssr: false })

const Desktop = () => {

  useEffect(() => {
    Aos.init({once: true, duration:700});
  }, [])

  return (
  <div className='home-styles' data-aos="fade-in">
    <VideoComp/>
    <div style={{backgroundColor:"white"}} className='bg-02'>
      <CircleIcons/>
      <Container className='pt-5 px-4'>

      <div className='blue-txt px-3' style={{letterSpacing:7}}>CHOOSE YOUR PLACE</div>
      <h1 className='fw-700 px-3'><span className='black-txt'>BEST</span> <span className='blue-txt'>SELLING ACTIVITIES</span></h1>
      <BestSelling/>
      </Container>
    </div>
    <div className='bg-white'>
      <PromoSection />
    </div>
    {/* <Slider/> */}
    <div className='py-5 bg-02' style={{backgroundColor:"white"}}>
    <Container className='my-5' data-aos='fade-up'>
      <h1 className='mt-3 fw-700 px-4'>ADVENTURES &<span className='blue-txt'> TOUR ACTIVITIES</span></h1>
      <Adventures/>
    </Container>

    <Container className='my-0 py-3' data-aos='fade-up'>
      <h1 className='mt-3 fw-700 px-4'>COMBO<span className='blue-txt'> TOUR ACTIVITIES</span></h1>
      <Combos/>
    </Container>

    </div>
    {/* <SignUp/> */}
  </div>
  )
}

export default React.memo(Desktop)