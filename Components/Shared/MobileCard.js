import React, { useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import { HiArrowLongRight } from 'react-icons/hi2';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const MobileCard = ({tour, height, info, font}) => {
    
    const router = useRouter();
    const conversion = useSelector((state) => state.currency.conversion);

  return (
    <div className='hover-shadow' 
        style={{backgroundColor:'#29717c'}}
        onClick={()=>{
            if(!info){
                router.push(`/product/${tour.id}`)
            }
        }}
    >
        <img src={tour.main_image} className="filter" style={{width:'100%', height:height}} />
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
                        <FaMapMarkerAlt size={15} style={{}} />
                    }
                    {" "}
                    {tour.title.slice(0, 28)}
                </div>
                <div className='full-overlay-line'></div>
                <div style={{width:'90%'}}>
                    <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                    <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                    <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                    <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                    <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                    <span className='' style={{fontSize:10, fontWeight:300, whiteSpace:'nowrap', color:'white'}}>{"("}4 Reviews{")"}</span>
                </div>
            </div>
        }
        {info &&
        <div style={{minHeight:20}} className="mt-2">    
            <div style={{color:'white'}}>{(tour.TourOptions[0].adult_price*conversion.rate).toFixed(2)} {conversion.currency}</div>
        </div>
        }
        </div>
    </div>
  )
}

export default MobileCard