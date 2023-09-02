import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FiCheckSquare } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { Rate } from 'antd';
import { TbPoint } from "react-icons/tb";
import useWindowSize from '/functions/useWindowSize';

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
      <div className={`${size.width<400?"fs-20 mt-2":"fs-30"} fw-700 blue-txt`}>{tour.title}</div>
      <span><Rate disabled defaultValue={5} style={{fontSize:12, color:'orange'}} /></span>
      <span className='mx-2 fs-12' style={{color:'grey'}}>{"("}3 Reviews{")"}</span> 
        <IoLocationSharp size={15} style={{position:'relative', bottom:2}}/> 
        {tour.destination.toUpperCase()}, {tour.city}
      <img className='my-3' src={mainImage} 
        style={{borderRadius:size.width<400?10:23, width:'100%', height:size.width<400?220:"100%"}}  alt="Tour"
      />
      <Row className={`${size.width<400?"px-2":""}`}>
        {images.map((x, i)=>{
          return(
            <Col key={i} md={3} xs={3} onClick={()=>setMainImage(x)} className={`${size.width<400?"p-0 px-1":""}`}>
              <img src={x} className='img-hover' 
                style={{width:'100%', borderRadius:size.width<400?10:20, height:size.width<400?50:100}} 
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