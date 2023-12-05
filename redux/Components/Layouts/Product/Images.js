import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { IoLocationSharp } from "react-icons/io5";
import { Rate } from 'antd';
import useWindowSize from '/functions/useWindowSize';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css/pagination';
import 'swiper/css';

const Images = ({tour, detail}) => {

  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const size = useWindowSize();

  useEffect(() => {
    if(Object.keys(detail).length>0){
      let tempImages = [...detail.more_images.split(",")];
      tempImages.unshift(tour.main_image)
      setImages(tempImages)
    }
    setMainImage(tour.main_image);

  }, [detail])
  
  return (
    <div>
      <div className={`${size.width<400?"fs-20 mt-2":"fs-40"} fw-700 blue-txt`}>{tour.title}</div>
      <span><Rate disabled defaultValue={5} style={{fontSize:12, color:'orange'}} /></span>
      <span className='mx-2 fs-12' style={{color:'grey'}}>{"("}0 Reviews{")"}</span> 
        <IoLocationSharp size={15} style={{position:'relative', bottom:2}}/> 
        {tour.destination?.toUpperCase()}, {tour.city}
        {/* <img className='my-3' src={mainImage} 
          style={{borderRadius:size.width<400?10:23, width:'100%'}}  alt="Tour"
        /> */}
        <div className='mt-2'></div>
        <Swiper pagination={true} modules={[Pagination]} spaceBetween={30}>
          {images.map((x)=>{
            return(
              <SwiperSlide ke={x}><img src={x} style={{borderRadius:18, height:size.width<400?200:400}} /></SwiperSlide>
          )})}
        </Swiper>
      <Row className={`${size.width<400?"px-2 mt-2":"mt-3"}`}>
        {images.map((x, i)=>{
          return(
            <Col key={i} md={2} xs={2} onClick={()=>setMainImage(x)} className={`${size.width<400?"p-0 px-1":""}`}>
              <img src={x} className='' 
                style={{width:'100%', borderRadius:size.width<400?8:15, height:size.width<400?50:70}} 
                alt="Tour"  
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
export default Images

// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// import 'swiper/css/pagination';
// import 'swiper/css';

// export default function App({tour, detail}) {
//   return (
//     <>
//       <Swiper pagination={true} className="mySwiper">
//         {
//           detail.more_images.split(",").map((x)=>{
//             return(
//               <SwiperSlide ke={x}><img src={x} /></SwiperSlide>
//             )
//           })
//         }
//       </Swiper>
//     </>
//   );
// }
