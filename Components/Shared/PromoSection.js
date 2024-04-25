import React, { useState, useEffect, useMemo } from 'react'
import { message, Modal } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import 'swiper/css/autoplay';
import moment from 'moment';
import axios from 'axios';
import 'swiper/css';
import Link from 'next/link';
import { delay } from "/functions/delay"
import { notification } from 'antd';
import useWindowSize from '/functions/useWindowSize';

const Context = React.createContext({
  name: 'Default',
});

const PromoSection = ({mobile}) => {

  const [promos, setPromos] = useState([]);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const size = useWindowSize()

  const expensiveCalculation = (num) => {
    let result;
    result = Math.floor(Math.random() * num?.length);
    return result;
  };
  const calculation = useMemo(() => expensiveCalculation(promos), [promos]);

  const openNotification = () => {
    api.info({
      message: `Grab a discount`,
      description:(
        <Link className='promo' style={{width:size.width>390?340:300, textDecoration:'none', position:'relative', right:size.width>390?30:55}} href="#first-section">
        <div className='promo-left'>
          <div className={`fs-${size.width>390?'22':'20'} fw-700 mb-1 `}>{promos[calculation]?.name}</div>
          <div className={`fs-${size.width>390?'14':'12'}`}>Get a discount of {promos[calculation]?.amount} {promos[calculation]?.byPercentage=="0"?"AED":"%"}</div>
          <span className={`fs-${size.width>390?'14':'12'}`}>Validity: {moment(promos[calculation]?.validity).format("MM/DD/YYYY")}</span>
        </div>
        <div className='promo-right text-center'>
          <span className='wh-txt'>Flat off</span>
          {size.width>390 &&<h5 className='wh-txt fw-700'>
            {promos[calculation]?.amount} {promos[calculation]?.byPercentage=="0"?"AED":"%"}
          </h5>}
          {size.width<=390 &&
          <h6 className='wh-txt fw-700'>
            {promos[calculation]?.amount} {promos[calculation]?.byPercentage=="0"?"AED":"%"}
          </h6>}
          <button className='orange-btn'>GET</button>
        </div>
      </Link>
      ),
      icon: (
        <img src='icons/hurray.webp' height={30} />
      ),
      duration: 5,
    });
  };

  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    [],
  );

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_GIT_VISIBLE_PROMOS)
    .then(async(x)=>{
      await delay(2000);
      setPromos(x?.data?.result);
    })
  }, []);

  useEffect(() => {
    if(promos?.length>2 && show==false){
      openNotification('topRight');
      setShow(true)
    }
  }, [promos]);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className=''>
        <Container className='pt-5 pb-3'>
        <Row id="first-section">
          <Col md={12} className='text-center' xs={12}>
            <p style={{letterSpacing:7, fontWeight:400}}>CHECKOUT WITH AMAZING DISCOUNT</p>
            <hr/>
            <h2 style={{letterSpacing:6, fontWeight:800}} className='blue-txt '>PROMO CODES</h2>
          </Col>
        </Row>
        <div className='my-1' style={{paddingLeft:mobile==true?'4%':0}}>
          <Swiper
            slidesPerView={mobile==true?1:3}
            autoplay={{
              delay: 2500,
              disableOnInteraction:false
            }}
            modules={[Autoplay]}
          >
          {promos?.length>0 && promos.slice(0,5).map((x, i)=>{
          return(
            <SwiperSlide key={i}>
              <div className='promo' style={{width:size.width>390?350:310}}>
                <div className='promo-left'>
                  <div className={` fs-${size.width>390?'20':'15'} fw-700 mb-1 `}>{x.name}</div>
                  <div className={`fs-${size.width>390?'14':'10'}`}>Get a discount of {x.amount} {x.byPercentage=="0"?"AED":"%"}</div>
                  <span style={{color:'silver'}}>Validity: {moment(x.validity).format("MM/DD/YYYY")}</span>
                </div>
                <div className='promo-right text-center'>
                  <span className='wh-txt'>Flat off</span>
                  <h5 className='wh-txt fw-700'>
                    {x.amount} {x.byPercentage=="0"?"AED":"%"}
                  </h5>
                  <button className='orange-btn'
                    onClick={()=>{
                      navigator.clipboard.writeText(`i${x.code}`);
                      message.info(`PROMO Code Copied!`)
                    }}
                  >COPY</button>
                </div>
              </div>
            </SwiperSlide>
          )})}
          </Swiper>
        </div>
        <Row>
          <Col md={5} xs={3}></Col>
          <Col md={2} xs={6} className='text-center'>
            <div className='custom-btn-sm-green cur' onClick={()=>setOpen(true)}>Show More</div>
          </Col>
          <Col md={5} xs={3}></Col>
        </Row>
        </Container>
        <Modal
          open={open}
          onCancel={()=>setOpen(false)}
          centered
          footer={[]}
          width={mobile==true?'100vw':'80%' }
        >   
        <div className='mt-4' style={{height:400, overflowY:'auto', overflowX:'hidden'}}>
          <Row>
            <h3>Current Offers</h3>
            <hr/>
            {promos?.map((x, i)=>{
            return(
              <Col md={4} key={i}>
                <div className='promo'>
                  <div className='promo-left'>
                    <div className='fs-20 fw-700 mb-1'>{x.name}</div>
                    <div>Get a discount of {x.amount} {x.byPercentage=="0"?"AED":"%"}</div>
                    <span style={{color:'silver'}}>Validity: {moment(x.validity).format("MM/DD/YYYY")}</span>
                  </div>
                  <div className='promo-right text-center'>
                    <span className='wh-txt'>Flat off</span>
                    <h5 className='wh-txt fw-700'>
                      {x.amount} {x.byPercentage=="0"?"AED":"%"}
                    </h5>
                    <button className='orange-btn'
                      onClick={()=>{
                        navigator.clipboard.writeText(`i${x.code}`);
                        message.info(`PROMO Code Copied!`)
                      }}
                    >COPY</button>
                  </div>
                </div>
              </Col>
            )})
          }
          </Row>
        </div>
        </Modal>
      </div>
    </Context.Provider>
  )
}

export default React.memo(PromoSection)