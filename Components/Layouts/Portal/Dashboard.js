import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { Col, Row } from 'react-bootstrap';

const Dashboard = ({sessionData, insights}) => {

  const [insightData, setInsightData] = useState({
    unassinged:[],
    assinged:[],
    customs:[],
    reserves:[],
    tours:[],
    tours:[],
  })

    useEffect(() => {
      if(sessionData.isLoggedIn==true){
        //Router.push('/login')
      }else{
        Router.push('/login')
      }
    }, [sessionData]);

    useEffect(() => {
      let no = []
      let yes = []
      no = insights.result.booked.filter((x)=> x.assigned=="0")
      yes = insights.result.booked.filter((x)=> x.assigned=="1")
      console.log(yes);
      let dataObj = {
        ...insights.result,
        unassinged:no,
        assinged:yes
      }
      setInsightData(dataObj)
    }, [])

  return (
    <div className=''>
      <button className='btn-custom p-2 px-4'>Print Report</button>
      <hr/> 
      <Row>
        <Col md={4} className='my-3'>
        <div className='insight-box shadow '>
          <h4>Total Tours</h4>
          {insightData.tours.length} Tours
        </div>
        </Col>
        <Col md={4} className='my-3'>
        <div className='insight-box shadow '>
          <h4>Total Customers</h4>
          {insightData.customs.length} Customers
        </div>
        </Col>
        <Col md={4} className='my-3'>
        <div className='insight-box shadow '>
          <h4>Total Reservation</h4>
          {insightData.reserves.length} Reservation
        </div>
        </Col>
        <Col md={4} className='my-3'>
        <div className='insight-box shadow '>
          <h4>Assigned Tours</h4>
          {insightData.assinged.length} Assigned Reservation
        </div>
        </Col>
        <Col md={4} className='my-3'>
        <div className='insight-box shadow '>
          <h4>Unassigned Tours</h4>
          {insightData.unassinged.length} Unassigned Reservation
        </div>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard