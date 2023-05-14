import React,{ useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { CiLocationOn } from "react-icons/ci";
import { ConfigProvider, Slider, Select, Checkbox } from 'antd';
import aos from "aos";
import SignUp from '../../Shared/SignUp';
import Tours from './Tours';

const Search = ({destination, city, date, tourData}) => {
  
  const [records, setRecords] = useState([]);
  const [index, setIndex] = useState(1);
  const [pages, setPages] = useState(0);
  const [pagination, setPagination] = useState(false);
  const [price, setPrice] = useState(3000);
  const [category, setCategory] = useState('');

  useEffect(() => {
    aos.init({duration:300})
    setRange(price, category);
  }, [price, category])
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
  const setRange = (gottenPrice, cat) => {
    //console.log(tourData.result)
    let tempTours = [];
    tourData.result.forEach((x)=>{
      if(parseFloat(gottenPrice) >= parseFloat(x.TourOptions[0].adult_price)){
        if(cat!=''){
          if(x.category==cat){
            console.log('Inside Cat')
            tempTours.push({...x, price:parseFloat(x.TourOptions[0].adult_price)})
          }
        }else{
          console.log('Outside Cat')
          tempTours.push({...x, price:parseFloat(x.TourOptions[0].adult_price)})
          //console.log(x.category)
        }
      }
    });
    Object.keys(category).forEach((x)=>{
      tempTours = tempTours.filter((y)=>{
        return tempTours
      })
    })
    setRecords(tempTours);
    if(tempTours.length>9){
      setPagination(true)
      let total = tempTours.length/9;
      if(total > parseInt(total)){
        total= parseInt(total) + 1;
      }
      setPages(total);
    }else {
      setPagination(false)
    }
    setIndex(1)
  }
  const adjustCategory = (cat) => {
    setCategory(category==cat?'':cat)
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
    <div className='py-5 search-bg' data-aos="fade-up">
      <Container className='px-1 pt-3'>
        <Row>
          <Col md={3} className="" style={{paddingRight:10}}>
              <div className='tour-filters'>
                  <div className=''>
                    <b><CiLocationOn className='' size={25} style={{position:'relative', bottom:2}} /> Select Location</b>
                  </div>
                  <div className=''>
                  <Row className='tour-fltr-locate px-3 py-3 my-2'>
                      <Col md={12} className='fs-12 '>
                        <div><b>Destination</b></div>
                          <ConfigProvider
                            theme={{
                              token: {
                                colorPrimary: '#147ba1ea',
                                borderRadius:0
                              },
                            }}
                          >
                            <Select style={{minWidth:"100%"}} defaultValue={destination} 
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
                      <Col md={12} className='mt-3 fs-12'>
                        <div><b>City</b></div>
                          <ConfigProvider
                            theme={{
                              token: {
                                colorPrimary: '#147ba1ea',
                                borderRadius:0
                              },
                            }}
                          >
                            <Select  style={{minWidth:"100%"}} defaultValue={city} 
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

              </div>
              <div>
              <h5 className='mt-4 mb-0 blue-txt px-1'><b>Price</b></h5>
              <h6 className='mt-1 px-1'>0 - {price}</h6>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#147ba1ea',
                    borderRadius:0
                  },
                }}
              >
                <Slider className='' defaultValue={price} max={3000} onChange={(e)=>setPrice(e)} />
              </ConfigProvider>
              </div>
              <div className='px-1'>
              <h5 className='mt-4 mb-2 blue-txt'><b>Duration</b></h5>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#147ba1ea',
                    padding:50,
                    height:40,
                    borderRadius:0,
                    size:'large'
                  },
                }}
              >
                <Checkbox><h6>Upto 1 hour</h6></Checkbox><br/>
                <Checkbox><h6>1 to 4 hours</h6></Checkbox><br/>
                <Checkbox><h6>4 hours to 1 day</h6></Checkbox><br/>
              </ConfigProvider>
              </div>
              <div className='px-1'>
              <h5 className='mt-4 mb-2 blue-txt'><b>Category</b></h5>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#147ba1ea',
                    padding:50,
                    height:40,
                    borderRadius:0,
                    size:'large'
                  },
                }}
              >
                <Checkbox checked={category=="Theme Parks"?true:false}  onChange={()=>adjustCategory("Theme Parks")}><h6>Theme Parks</h6></Checkbox><br/>
                <Checkbox checked={category=="City Tours"?true:false}   onChange={()=>adjustCategory("City Tours")}><h6>City Tours</h6></Checkbox><br/>
                <Checkbox checked={category=="Luxury Tours"?true:false} onChange={()=>adjustCategory("Luxury Tours")}><h6>Luxury Tours</h6></Checkbox><br/>
                <Checkbox checked={category=="Adventure"?true:false}    onChange={()=>adjustCategory("Adventure")}><h6>Adventure</h6></Checkbox><br/>
                <Checkbox checked={category=="Water Parks"?true:false}  onChange={()=>adjustCategory("Water Parks")}><h6>Water Parks</h6></Checkbox><br/>
              </ConfigProvider>
              </div>
          </Col>
          <Col md={9} style={{height:1100}}>
              <Tours records={records} index={index} pages={pages} pagination={pagination} price={price} category={category} setIndex={setIndex} />
          </Col>
        </Row>
      </Container>
    </div>
    <SignUp/>
    </div>
  )
}

export default Search