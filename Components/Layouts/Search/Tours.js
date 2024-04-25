import React from 'react';
import { IoLocation } from "react-icons/io5";
import { Rate} from 'antd';
import { Row, Col } from 'react-bootstrap';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { ConfigProvider, Button, Input, Popover  } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const Tours = ({records, size, index, price, search, setSearch, duration, Filter}) => {

  return (
    <>
    {records.length>0 &&
    <>
      <Row>
        <Col md={12} className='pb-3' xs={10}>
            <h5><b>{records.filter((x)=>{
              if(search==""){
                return x
              } else if(x.title.toLowerCase().includes(search.toLowerCase())){
                return x
              }
          }).length} Activities Found</b></h5>
            <ConfigProvider theme={{ token:{ colorPrimary: '#147ba1ea', borderRadius:0 }}} >
              <Input  onChange={(e)=> setSearch(e.target.value)} value={search} placeholder='Search' />
            </ConfigProvider>
        </Col>
        {size.width<500 &&
          <Col xs={2} className='px-0 mx-0' style={{paddingTop:31}}>
          <Popover 
            placement="topLeft" 
            title={"Filter Activities"} 
            content={
              <div style={{border:'1px solid #147ba1ea', width:300, padding:20}}>
                <Filter/>
              </div>
            }
          >
            <Button>
              <div style={{height:22}}><FilterOutlined/></div>
            </Button>
          </Popover>  
          </Col>
        }
        <hr className='p-0 mb-3 mx-0'/>
        {
          records.filter((x)=>{
            return x.price <= price
          }).filter((x)=>{
            if(search==""){
              return x
            } else if(x.title.toLowerCase().includes(search.toLowerCase())){
              return x
            }
          }).filter((x)=>{
            let temp = {};
            if(duration.uptoOne){
              temp = x.duration=='Upto 1 hour'?x:null
            }
            if(duration.oneToFour){
              temp = x.duration=='1 to 4 hours'?x:null
            }
            if(duration.fourToDat){
              temp = x.duration=='4 hours to 1 day'?x:null
            }
            return temp
          }).slice(0, index*9).map((x, i)=>{
          return(
          <Col md={4} xs={6} key={i} className={`px-${size.width>600?"1":"0"} search-tour-box`}  onClick={()=>Router.push(`/product/${x.slug}`)}>
            <div className={`search-box-container mx-1`}>
              <img className='search-box-img filter-2' src={x.main_image} height={size.width>600?150:80} width={"100%"} />
              <div className='px-2 search-bob-bottom'>
                <div className={`fs-${size.width>600?"17":"12"} py-1`} style={size.width>600?{}:{minHeight:44}}>
                      {size.width>600?
                          <>{x.title.length>36?x.title.slice(0, 28)+'...':x.title}</>:<>{x.title}</> 
                      }
                </div>
                <hr className={size.width>600?`px-5 mt-1 mb-0`:`py-0 my-0`} />
                {/* <Rate disabled defaultValue={x.rating} allowHalf style={{color:'#f0a800', cursor:'pointer', fontSize:size.width>600?10:7}} className={`${size.width>600?"mx-2":""}`} />  */}
                {/* {x.reviews==0?'':<span className='fs-10 silver-txt'>{"("}{x.reviews} reviews{")"}</span>}   */}
                {size.width>600?
                <div className='px-2'>
                  <div className='mt-4' style={{float:'left', fontWeight:500, fontSize:22}}>{parseFloat(x.price).toFixed(2)} AED</div>
                  <Link href={`/product/${x.slug}`} className='search-box-btn px-3 mt-4 py-2' style={{float:'right', textDecoration:'none', color:'white'}}
                  >BOOK NOWs</Link>
                </div>:
                <div className='mt-3'>
                  <div style={{float:'left', fontWeight:700, fontSize:12}}>
                    {parseFloat(x.price).toFixed(2)} AED
                  </div>
                  <br/>
                  <div className='text-center'>
                    <div 
                      className='search-box-btn py-1' 
                      style={{textDecoration:'none', color:'white', paddingLeft:"22%", paddingRight:"22%"}}
                    >
                      BOOK NOW
                    </div>
                  </div>
                </div>
                }
              </div>
            </div>
          </Col>
          )
        })}
      </Row>
    </>
    }
    {records.length==0 && 
      <div style={{color:'grey', border:'1px solid silver'}} className='p-5 mb-5'>
        <h3>No Similar Activity Found !</h3>
        <p>Try choosing different options</p>
      </div>
    }
    </>
  )
}
export default React.memo(Tours)