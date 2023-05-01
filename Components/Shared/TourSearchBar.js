import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { DatePicker } from "antd";

const TourSearchBar = () => {

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    const [ dropShow, setDropShow ] = useState(false);
    const [ hoverd, setHovered ] = useState("uae");
    const [ search, setSearch ] = useState("");
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

    const DropShow = () => {
        return(
            <div className={` ${dropShow?"dropshow":"dropshow-hidden"} `}>
                <Row style={{paddingBottom:0}}>
                    <Col md={3} style={{paddingLeft:15, paddingRight:0, paddingTop:0, paddingBottom:0}}>
                        <div className='country-opt' onMouseEnter={()=>setHovered("uae")}>United Arab Emirates</div> 
                        <div className='country-opt' onMouseEnter={()=>setHovered("eur")}>Europe</div> 
                    </Col>
                    <Col md={9} style={{borderLeft:"1px solid silver", paddingLeft:15, paddingRight:20, paddingTop:6, paddingBottom:0}}>
                        <Row className='px-1'>
                        {cities[hoverd].map((x, i)=>{
                        return(<Col key={i} md={4} className='dropdown-cont' onClick={()=>{setSearch(x.name)}}>
                            <img src={x.img} width={145} height={70} className='dropdown-img' />
                            <div
                            className='drop-down-btn'
                            style={{
                                fontWeight:"lighter",
                                fontStyle:"initial",
                                position:"relative",
                                textAlign:'center',
                                cursor:'pointer',
                                color:"white",
                                fontSize:14,
                                bottom:24,
                                width:145,
                                height:15,
                                textShadow:"1px 3px 2px #474747"
                            }}>{x.name}</div>
                        </Col>)})}
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }

  return (
    <>
    <div className='search-bar'>
    <Row>
        <Col md={2}></Col>
        <Col md={8} className='px-0'>
        <div style={{textAlign:'left'}}>
            <h1
                style={{
                    fontWeight:600,
                    color:"white",
                    textShadow:"3px 5px 2px #474747 "
                }}
            >Search Now</h1>
        </div>
        <Row className='bar-bg'>
        <Col md={6} className='px-0 py-0' 
            onMouseEnter={()=>setDropShow(true)} 
            onMouseLeave={()=>setDropShow(false)}
            > 
            <input type='text' placeholder='Enter Destination' value={search} onChange={(e)=>setSearch(e.target.value)} />
            <DropShow/>
        </Col>
        <Col md={3} className='px-0'>
            <DatePicker type='date' className='date-search-box' onChange={onChange} />
            {/* <input type='date' /> */}
        </Col>
        <Col md={3} className='px-0'>
            <button className='search-btn'>
                Go
            </button>
        </Col>
        </Row>
        </Col>
        <Col md={2}></Col>
    </Row>
    </div>
    </>
  )
}

export default TourSearchBar