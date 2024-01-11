import React, { useState ,useRef } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { DatePicker } from "antd";
import Router, { useRouter } from 'next/router';

const TourSearchBar = () => {
    const router = useRouter();
    const [ dropShow, setDropShow ] = useState(false);
    const [ hoverd, setHovered ] = useState("uae");
    const [ search, setSearch ] = useState("");
    const [ date, setDate ] = useState("");
    const cities = {
        uae:[
            {name:"Abu Dhabi", img:"dropdowns/Abu-Dhabi.png"},
            {name:"Dubai City", img:"dropdowns/Dubai-City.png"},
            // {name:"Fujairah", img:"dropdowns/Fujairah.png"},
            // {name:"Rais-Al-Khaimah", img:"dropdowns/Rais-Al-Khaimah.png"},
            // {name:"Sharjah", img:"dropdowns/Sharjah.png"},
            // {name:"Ajman", img:"dropdowns/Ajman.png"},
        ],
        //eur:[{name:"Paris", img:"dropdowns/Paris.png"}]
    }

    const DropShow = () => {
        return(
            <div className={` ${dropShow?"dropshow":"dropshow-hidden"} `}>
                <Row style={{paddingBottom:0}}>
                    <Col md={3} style={{paddingTop:5, paddingBottom:0}}>
                        <div className='country-opt my-3' onMouseEnter={()=>setHovered("uae")}>United Arab Emirates</div> 
                        {/* <div className='country-opt' onMouseEnter={()=>setHovered("eur")}>Europe</div>  */}
                    </Col>
                    <Col md={9} style={{borderLeft:"1px solid silver", paddingTop:6, paddingBottom:0, paddingRight:25, paddingLeft:30}}>
                        <Row>
                        {cities[hoverd].map((x, i)=>{
                        return(
                            <Col key={i} md={6} className='dropdown-cont mx-0 px-0 py-0 my-0' onClick={()=>setSearch(x.name)}
                            >
                                <img src={x.img} width={"90%"} height={"80%"} className='dropdown-img' />
                                <div
                                style={{
                                    position:"relative",
                                    textAlign:'center',
                                    cursor:'pointer',
                                    fontSize:14,
                                    bottom:24,
                                    width:"94%",
                                    height:15,
                                    color:'white',
                                    textShadow:"1px 3px 2px #474747"
                                }}>{x.name}</div>
                            </Col>
                        )})}
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
        <Col md={8} className='px-5'>
        <div style={{textAlign:'left'}} className='px-5'>
            <h3
                style={{
                    fontWeight:600,
                    color:"white",
                    textShadow:"3px 5px 2px #474747 "
                }}
            >Search Now</h3>
        </div>
        <Row className='bar-bg mx-5'>
        <Col md={9} className='px-0 py-0' 
            onMouseEnter={()=>setDropShow(true)} 
            onMouseLeave={()=>setDropShow(false)}
            > 
            <input type='text' placeholder='Enter Destination' value={search} onChange={(e)=>setSearch(e.target.value)} />
            <DropShow/>
        </Col>
        <Col md={3} className='px-0'>
            <button className='search-btn' 
                onClick={()=>{
                    router.push({
                        pathname: '/search',
                        query: { destination:hoverd, city:search, date:date }
                    })
                    //Router.push(`/search??destination=${hoverd}?city=${search}`);
                }}
            >
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

export default React.memo(TourSearchBar)