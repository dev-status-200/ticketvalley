import React, { useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import { HiArrowLongRight } from 'react-icons/hi2';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Row, Col } from "react-bootstrap";

const MobileCard = ({tour, height, info, font}) => {
    
    const router = useRouter();
    const conversion = useSelector((state) => state.currency.conversion);

  return (
    <div className='hover-shadow' 
        style={{backgroundColor:'#29717c'}}
        onClick={()=>router.push(`/product/${tour.id}`)}>
        <img src={tour.main_image} className="filter" style={{width:'100%', height:height}} alt='Tour' />
        <div className='p-2'>
        {!info &&
        <div className='overlay-text'>
            <div>{tour.title.slice(0,25)}</div>
            <div className='overlay-btm-line'></div>
        </div>
        }
        {info &&
            <div className=''>
                <div style={{fontSize:font, fontWeight:300, color:'white'}}>
                    {info && 
                        <FaMapMarkerAlt size={15} style={{position:'relative', bottom:2}} />
                    }
                    {" "}
                    {tour.title.slice(0, 18)}...
                </div>
                <div className='full-overlay-line'></div>
                <div style={{width:'90%'}}>
                    <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                    <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                    <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                    <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                    <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                    <span className='mx-1' style={{fontSize:10, fontWeight:300, whiteSpace:'nowrap', color:'white'}}>{"("}4 Reviews{")"}</span>
                </div>
            </div>
        }
        {info &&
        <div style={{minHeight:20}} className="mt-2">    
            <div style={{color:'white'}}>{(tour.TourOptions[0].adult_price*conversion.rate).toFixed(2)} {conversion.currency}</div>
        </div>
        }
            <Row>
                <Col md={1}>
                <button className='custom-btn-mobile-02' onClick={()=>router.push(`/product/${tour.id}`)}>
                    BOOK NOW
                </button>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default React.memo(MobileCard)