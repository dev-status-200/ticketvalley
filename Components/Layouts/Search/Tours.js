import React from 'react';
import { IoLocation } from "react-icons/io5";
import { Rate} from 'antd';
import { Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Tours = ({records, index, pages, pagination, price, category, setIndex, searchTerm}) => {
  const router  = useRouter();
  return (
    <>
    {records.length>0 &&<>
        <Row>
            <Col md={12} className=''>
                <h5><b>{records.length} Activities Found</b></h5>
            </Col>
            <hr className='p-0 mb-3 mx-0'/>
            {records.filter((x)=>{
            return x.price <= price
            }).slice(0, index*9).map((x, i)=>{
            return(
            <Col md={4} className='px-1 search-tour-box' key={i}>
                <div className='search-box-container mx-1'>
                <img className='search-box-img filter-2' src={x.main_image} height={150} width={"100%"} />
                <div className='px-2 search-bob-bottom'>
                    <div className='fs-15 py-1'><IoLocation style={{position:'relative', bottom:3}} /> <b>{x.title.slice(0,20)} ...</b></div>
                    <hr className='px-5 mt-1 mb-0' />
                    <Rate disabled  defaultValue={x.rating} allowHalf style={{color:'#f0a800', cursor:'pointer', fontSize:10}} className='mx-2' /> 
                    {x.reviews==0?'':<span className='fs-10 silver-txt'>{"("}{x.reviews} reviews{")"}</span>}  
                    <div className='px-2'>
                    <div className='mt-3' style={{float:'left', fontWeight:900, fontSize:18}}>{parseFloat(x.price).toFixed(2)} AED</div>
                    <Link href={`/product/${x.id}`} className='mt-3 search-box-btn px-3 py-2' style={{float:'right', textDecoration:'none', color:'white'}}
                        //onClick={()=>router.push(`/product/${x.id}`)}
                    >BOOK NOW</Link>
                    </div>
                </div>
                </div>
            </Col>
            )
            })}
        </Row>
        {/* {pagination &&<>
            <hr className='p-0 m-0' />
            <div>
            <div className='text-center'>
            <button className='search-page' onClick={()=>setIndex(index!=1?index-1:1)}>PREV</button>
            <button className='search-page'>{index}</button>
            <button className='search-page' onClick={()=>setIndex(index!=pages?index+1:pages)}>NEXT</button>
            </div>
            </div>
        </>} */}
        </>}
        {records.length==0 && 
        <div style={{color:'grey', border:'1px solid silver'}} className='p-5'>
            <h3>No Similar Activity Found !</h3>
            <p>Try search something different</p>
        </div>
    }
    </>
  )
}

export default Tours
