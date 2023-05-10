import React,{ useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { CiLocationOn } from "react-icons/ci";
import { IoLocation } from "react-icons/io5";
import { Rate, ConfigProvider, Button, Select } from 'antd';
import { useRouter } from 'next/router';

const Search = ({destination, city, date, tourData}) => {
  
  const router  = useRouter();
  const [records, setRecords] = useState([]);
  const [index, setIndex] = useState(1);
  const [pages, setPages] = useState(0);
  const [pagination, setPagination] = useState(false);

  useEffect(() => {
    setRecords(tourData.result);
    if(tourData.result.length>9){
      setPagination(true)
      let total = tourData.result.length/9;
      if(total > parseInt(total)){
        total= parseInt(total) + 1;
      }
      setPages(total);
    }else {
      setPagination(false)
    }
  }, [])
  
  const cities = {
    uae:[
        {name:"Abu Dhabi", img:"dropdowns/Abu-Dhabi.PNG"},
        {name:"Dubai City", img:"dropdowns/Dubai-City.PNG"},
        {name:"Fujairah", img:"dropdowns/Fujairah.PNG"},
        {name:"Rais-Al-Khaimah", img:"dropdowns/Rais-Al-Khaimah.PNG"},
        {name:"Sharjah", img:"dropdowns/Sharjah.PNG"},
        {name:"Ajman", img:"dropdowns/Ajman.PNG"},
    ],
    eur:[{name:"Paris", img:"dropdowns/Paris.PNG"}]
  }

  const handleChange = () => {
  }

  return (
    <div className='home-styles'>
    <div className={`activity-bg activity py-4`}>
      {/* Header */}
      <div className='navBar'>
        <Link className='navLink' href='/'>HOME</Link>
      <div className='dropdown'>
      <div className='navLink dropbtn'>DESTINATION</div>
      <div className="dropdown-content">
          <a className='menu-drop-links pb-2'>Dubai</a>
      </div>
      </div>
        <span className="navLink">
          <img src={'/images/logo.png'} height={100} />
        </span>
        <div className='dropdown  mx-2'>
          <span className='navLink dropbtn'>ACTIVITIES</span>
          <div className="dropdown-content">
              <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Theme Parks'}}}>Theme Parks</Link>
              <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Water Parks'}}}>Water Parks</Link>
              <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'City Tours'}}}>City Tours</Link>
              <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Luxury Tours'}}}>Luxury Tours</Link>
              <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/activities', query:{id:'Adventure'}}}>Adventure</Link>
          </div>
        </div>
        <Link className='navLink' href='/about'>ABOUT US</Link>
      </div>
      <h1 className='text-center mt-5 wh-txt fw-700 text-shadow fs-45'>SEARCH ACTIVITIES</h1>
    </div>
    <div className='py-5'>
        <Container>
            <Row>
                <Col md={3} className="px-4">
                    <div className='tour-filters'>
                        <div><b>Select Location</b></div>
                        <Row className='tour-fltr-locate px-0 py-3 my-2'>
                            <Col md={2}><CiLocationOn className='' size={25} style={{position:'relative', top:5}} /></Col>
                            <Col md={10} className='fs-12'>
                              <div><b>Destination</b></div>
                                <ConfigProvider
                                  theme={{
                                    token: {
                                      colorPrimary: '#147ba1ea',
                                      borderRadius:0
                                    },
                                  }}
                                >
                                  <Select style={{minWidth:140}} defaultValue={destination} size='small'
                                    options={[
                                      {
                                        value: 'uae',
                                        label: 'UAE',
                                      },
                                      {
                                        value: 'eur',
                                        label: 'EUR',
                                      }
                                    ]} 
                                    onChange={(e)=>{
                                      router.push({
                                        pathname: '/search',
                                        query: { destination:e, city:city, date:date }
                                      })
                                    }}
                                    />
                                </ConfigProvider>
                            </Col>
                            <Col md={2} className='mt-3'><CiLocationOn className='' size={25} style={{position:'relative', top:5}} /></Col>
                            <Col md={10} className='mt-3 fs-12'>
                              <div><b>City</b></div>
                                <ConfigProvider
                                  theme={{
                                    token: {
                                      colorPrimary: '#147ba1ea',
                                      borderRadius:0
                                    },
                                  }}
                                >
                                  <Select  style={{minWidth:140}} defaultValue={city} size='small'
                                    onChange={(e)=>{
                                      router.push({
                                        pathname: '/search',
                                        query: { destination:destination, city:e, date:date }
                                      })
                                    }}
                                    options={[
                                      {
                                        value: 'Abu Dhabi',
                                        label: 'Abu Dhabi',
                                      },
                                      {
                                        value: 'Dubai City',
                                        label: 'Dubai City',
                                      },
                                      {
                                        value: 'Fujairah',
                                        label: 'Fujairah',
                                      },
                                      {
                                        value: 'Rais-Al-Khaimah',
                                        label: 'Rais-Al-Khaimah'
                                      },
                                      {
                                        value: 'Sharjah',
                                        label: 'Sharjah'
                                      },
                                      {
                                        value: 'Ajman',
                                        label: 'Ajman'
                                      },
                                    ]} />
                                </ConfigProvider>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md={9} style={{height:1100}}>
                  {records.length>0 &&<>
                  <Row>
                    {records.slice(((index-1)*9), index*9).map((x, i)=>{
                      return(
                      <Col md={4} className='px-1 search-tour-box'>
                        <div className='search-box-container mx-1'>
                          <img className='search-box-img' src={x.main_image} height={150} width={"100%"} />
                          <div className='p-2 search-bob-bottom'>
                            <div className='fs-15 py-1'><IoLocation style={{position:'relative', bottom:3}} /> <b>{x.title}</b></div>
                            <hr className='px-5 mt-1 mb-0' />
                            <Rate disabled  defaultValue={4.5} style={{color:'#f0a800', cursor:'pointer', fontSize:12}} className='mx-2' /> 
                            <span className='fs-10 silver-txt'>{"("}100+ reviews{")"}</span>
                            <div className='px-2'>
                              <div className='mt-3' style={{float:'left', fontWeight:900, fontSize:18}}>{parseFloat(x.TourOptions[0].adult_price).toFixed(2)} AED</div>
                              <div className='mt-3 search-box-btn px-3 py-1' style={{float:'right'}}>BOOK NOW</div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      )
                    })}
                  </Row>
                  {pagination &&<>
                    <hr className='p-0 m-0' />
                    <hr className='p-0 m-0' />
                    <div>
                    <div className='text-center'>
                      <button className='search-page' onClick={()=>setIndex(index!=1?index-1:1)}>PREV</button>
                      <button className='search-page'>{index}</button>
                      <button className='search-page' onClick={()=>setIndex(index!=pages?index+1:pages)}>NEXT</button>
                    </div>
                    </div>
                  </>}
                  </>}
                  {records.length==0 && 
                  <div style={{backgroundColor:'white', color:'grey'}} className='p-5'>
                    <h3>No Similar Activity Found !</h3>
                    <p>Try search something different</p>
                  </div>
                  }
                </Col>
            </Row>
        </Container>
    </div>
    </div>
  )
}

export default Search