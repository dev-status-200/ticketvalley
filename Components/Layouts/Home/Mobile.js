
import CircleMobileIcons from "/Components/Shared/CircleMobileIcons"
import React from 'react';
import { Container } from 'react-bootstrap';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";
import dynamic from 'next/dynamic';

const BestSellingMobile = dynamic(() => import('./BestSellingMobile'), { ssr: false })
const PromoSection = dynamic(() => import('/Components/Shared/PromoSection'), { ssr: false })
const Adventures = dynamic(() => import('./AdventureTours'), { ssr: false })
const Combos = dynamic(() => import('./Combos'), { ssr: false })
const MobileSearch = dynamic(() => import('./MobileSearch'), { ssr: false })

const Mobile = () => {
  return (
    <>
    <div fluid="true">
      <MobileSearch />
      <div className="pt-3"></div>
      <CircleMobileIcons/>
    </div>
    <div className='pt-5 bg-02' style={{backgroundColor:"white"}}>
      <BestSellingMobile/>
      <PromoSection mobile={true} />
      <Container className='my-5' data-aos='fade-up'>
        <h3 className='mt-3 fw-700 text-center'>ADVENTURES & TOUR<span className='blue-txt'> ACTIVITIES</span></h3>
        <Adventures/>
      </Container>
      <Container className='my-0 pb-5' data-aos='fade-up'>
        <h3 className=' fw-700 text-center'>COMBO TOUR<span className='blue-txt'>  ACTIVITIES</span></h3>
        <Combos/>
      </Container>
    </div>
    </>
  )
}

export default React.memo(Mobile)