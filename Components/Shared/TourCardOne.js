import React, { useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import { HiArrowLongRight } from 'react-icons/hi2';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const TourCardOne = ({tour, height, info, font}) => {
    
    const router = useRouter();
    const conversion = useSelector((state) => state.currency.conversion);

  return (
    <div className='hover-shadow'
        onClick={()=>{
            if(!info){
                router.push(`/product/${tour.id}`)
            }
        }}
    >
        <div style={{width:'100%' , position:'relative', left:0, top:0}}>
        <img src={tour.main_image} className="filter" style={{width:'100%', height:height}} alt='Tour' />
        {!info &&<img src={'images/card-overlay.png'} className="overlay" style={{width:'100%'}} alt='Overlay' />}
        {info &&<img src={'images/card-overlay-2.png'} className="overlay" style={{width:'100%'}} alt='Overlay' />}
        {!info &&
        <div className='overlay-text'>
            <div>{tour.title.slice(0,25)}</div>
            <div className='overlay-btm-line'></div>
        </div>
        }
        {info &&
            <div>
                <div className='overlay-text px-2'>
                    <div style={{fontSize:font, fontWeight:300}}>
                        {info && 
                            <FaMapMarkerAlt size={15} style={{position:'relative', bottom:2}} />
                        }
                        {" "}
                        {tour.title.slice(0, 28)}
                    </div>
                    <div className='full-overlay-line'></div>
                    <div style={{width:'120%'}}>
                        <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                        <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                        <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                        <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                        <IoStar color='gold' style={{marginRight:'1%', fontSize:'60%'}} />
                        <span className='mx-1' style={{fontSize:15, fontWeight:300, whiteSpace:'nowrap'}}>{"("}4 Reviews{")"}</span>
                    </div>
                    {/* <div className='' style={{fontSize:'55%'}}>BOOK NOW <HiArrowLongRight style={{fontSize:30, position:'relative', bottom:1}}/></div> */}
                </div>
            </div>
        }
        </div>
        {info &&
        <div style={{minHeight:70, backgroundColor:'#29717c'}} className="p-3">
            <div style={{float:'left'}}>
                <h4 style={{color:'white'}}>{(tour.TourOptions[0].adult_price*conversion.rate).toFixed(2)} {conversion.currency}</h4>
            </div>
            <div style={{float:'right'}}>
                <button className='custom-btn-02' onClick={()=>router.push(`/product/${tour.id}`)}>
                    BOOK NOW
                </button>
            </div>
        </div>
        }
    </div>
  )
}

export default TourCardOne