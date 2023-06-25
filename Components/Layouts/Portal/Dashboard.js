import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { Col, Row, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import { Modal } from "antd";
import moment from 'moment';
import ExcelConverter from './ExcelConverter';

const Dashboard = ({sessionData, insights}) => {

  const [insightData, setInsightData] = useState({
    unassinged:[],
    assinged:[],
    customs:[],
    reserves:[],
    tours:[],
    tours:[],
  })

  const [total, setTotal] = useState(0.00);
  const [visible, setVisible] = useState(false);
  const [report, setReport] = useState([]);
  const [price, setPrice] = useState(0.00);
  const [from, setFrom] = useState(`${new Date()}`);
  const [to, setTo] = useState(`${new Date()}`);

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
      let dataObj = {
        ...insights.result,
        unassinged:no,
        assinged:yes
      }
      setInsightData(dataObj)
      let price = 0.00;
      insights.result.reserves.forEach((x)=>{
        price = price + parseFloat(x.final_price)
      })
      setPrice(price);
    }, [])

    const fetchSalesReport = async() => {
      await axios.get(process.env.NEXT_PUBLIC_GET_SALES_REPORT,{
        headers:{"from":`${from}`, "to":`${to}`}
      })
      .then((x)=>{
        setReport(x.data.result)
        setVisible(true);
        let initialValue = 0
        //let obj = [{n: 5}, {n: 9}, {n: 13}, {n: 25}, {n: 40}]
        let sum = x.data.result.reduce(function (accumulator, curValue) {
            return accumulator + parseFloat(curValue.final_price) 
        }, initialValue)
        setTotal(sum);
      })
    }

  return (
    <div className=''>
      <Row>
        <Col md={2}>
          <button className='btn-custom p-2 px-4 mt-3' 
          onClick={()=>fetchSalesReport()}>Get Report</button>
        </Col>
          <Col md={2} >
              From: <Form.Control  type={"date"} size="sm" value={from} onChange={(e)=>setFrom(e.target.value)} />
          </Col>
          <Col md={2}>
              To: <Form.Control type={"date"} size="sm" value={to} onChange={(e)=>setTo(e.target.value)} />
          </Col>
      </Row>
      <hr/> 
      <Row>
        <Col md={4} className='my-3'>
        <div className='insight-box shadow' onClick={()=>Router.push("/productCreation")}>
          <h4>Total Tours</h4>
          {insightData.tours.length} Tours
        </div>
        </Col>
        <Col md={4} className='my-3'>
        <div className='insight-box shadow' onClick={()=>Router.push("/customers")}>
          <h4>Total Customers</h4>
          {insightData.customs.length} Customers
        </div>
        </Col>
        <Col md={4} className='my-3'>
        <div className='insight-box shadow' onClick={()=>Router.push("/bookings")}>
          <h4>Total Reservation</h4>
          {insightData.reserves.length} Reservation
        </div>
        </Col>
        <Col md={4} className='my-3'>
        <div className='insight-box shadow' onClick={()=>Router.push("/bookings")}>
          <h4>Assigned Tours</h4>
          {insightData.assinged.length} Assigned Reservation
        </div>
        </Col>
        <Col md={4} className='my-3'>
        <div className='insight-box shadow' onClick={()=>Router.push("/bookings")}>
          <h4>Unassigned Tours</h4>
          {insightData.unassinged.length} Unassigned Reservation
        </div>
        </Col>
        <Col md={4} className='my-3'>
        <div className='insight-box shadow '>
          <h4>Total Earnings</h4>
          {price.toFixed(2)} AED
        </div>
        </Col>
      </Row>    
      <Modal
        open={visible}
        onOk={()=>setVisible(false)} 
        onCancel={()=>setVisible(false)} 
        title={`Sales Report for (${from}) - (${to})`}
        width={1000} footer={false} 
      >
        {visible &&
        <>
        <div className='table-sm-1 mt-3' style={{maxHeight:500, overflowY:'auto'}}>
        <Table className='tableFixHead'>
        <thead>
          <tr>
            <th>#</th>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
        {report.map((x, index) => {
          return (
          <tr key={index}>
            <td>{index+1} </td>
            <td>
              <div style={{color:"#108ee9"}}><b>#{x.booking_no}</b></div>
            </td>
            <td>{x.name} </td>
            <td>{x.email} </td>
            <td style={{color:'grey'}}>
              {moment(x.createdAt).format("DD - MMM - YYYY")}
            </td>
            <td style={{color:"green"}}><b>{parseFloat(x.final_price).toFixed(2)}</b></td>
          </tr>
          )
        })}
        <tr>
          <td colSpan={4}></td>
          <td><b></b></td>
          <td><b>{total.toFixed(2)}</b></td>
        </tr>
        </tbody>
        </Table>
        <ExcelConverter jsonData={report} fileName={"records"} />
      </div>
        </>}

      </Modal>
    </div>
  )
}

export default Dashboard