import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { IoLocationSharp } from "react-icons/io5";
import { Rate, Modal } from 'antd';
import useWindowSize from '/functions/useWindowSize';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css/pagination';
import 'swiper/css';

const Images = ({tour, detail}) => {

  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    if(Object.keys(detail).length>0){
      let tempImages = [...detail.more_images.split(",")];
      tempImages.unshift(tour.main_image)
      setImages(tempImages)
    }

  }, [detail])
  
  return (
    <div>
      <div className={`${size.width<600?"fs-20 mt-2":"fs-40"} fw-700 blue-txt`}>{tour.title}</div>
      <span><Rate disabled defaultValue={5} style={{fontSize:12, color:'orange'}} /></span>
      <span className='mx-2 fs-12' style={{color:'grey'}}>{"("}0 Reviews{")"}</span> 
      <IoLocationSharp size={15} style={{position:'relative', bottom:2}}/> 
      {tour.destination?.toUpperCase()}, {tour.city}
      <div className='mt-2'></div>
      <Swiper pagination={true} modules={[Pagination]} spaceBetween={30}>
        {images.length>0 && images.map((x, i)=>{
          return(
            <SwiperSlide key={i}><img src={x} style={{borderRadius:18, height:size.width<600?200:'100%'}} /></SwiperSlide>
        )})}
      </Swiper>
      <Row className={`${size.width<=600?"px-2 mt-2":"mt-3"}`}>
        {images.map((x, i)=>{
          return(
            <Col 
              key={i} md={"auto"} xs={"auto"} 
              className={`${size.width<600?"p-0 px-1":""}`}
              onClick={()=>{setImage(x); setOpen(true);}}
            >
              <img src={x} className='' 
                style={{width:size.width<=600?65:'100%', borderRadius:size.width<=600?8:15, height:size.width<=600?45:70}} 
                alt="Tour"  
              />
            </Col>
          )
        })}
      </Row>
      <Modal
        open={open}
        onCancel={()=>setOpen(false)}
        okButtonProps={{hidden:true}} cancelButtonProps={{hidden:true}}
        width={size.width<500?'100%':'100vw'}
        centered
      >
        <div className='text-center bg-black m-2' style={{borderRadius:15}}>
          <img src={image} style={{height:size.width<500?'100%':'90vh'}} />
        </div>
      </Modal>
    </div>
  )
}
export default React.memo(Images)