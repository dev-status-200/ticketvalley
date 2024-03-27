import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Table, Spinner } from 'react-bootstrap';
import moment from 'moment';

const PackageQueries = () => {

  const [ from, setFrom ] = useState(moment().subtract(7, 'days').format("YYYY-MM-DD"));
  const [ to, setTo ] = useState(moment().format("YYYY-MM-DD"));
  const [ load, setLoad ] = useState(false);
  const [ records, setRecords ] = useState([]);

  const getPackages = () => {
    setLoad(true);
    axios.get(process.env.NEXT_PUBLIC_GET_PACKAGE_QUERIES,{
      headers:{
        from:from,
        to:to,
      }
    }).then((x) => {
      setRecords(x.data.result);
      setLoad(false);
    })
  }

  const togglePackages = (data, index) => {
    setLoad(true);
    axios.post(process.env.NEXT_PUBLIC_POST_PACKAGE_TOGGLE,{
        id:data.id,
        status:data.status=='0'?'1':'0'
    }).then((x) => {
      console.log(x.data)
      let temp = [...records];
      temp[index].status = data.status=='0'?'1':'0'
      setRecords(temp);
      setLoad(false);
    })
  }

  return (
  <>
    <Row>
      <Col md={5}>
        <h4>Package Queries</h4>
      </Col>
      <Col md={1}>
        {load && <Spinner/>}
      </Col>
      <Col md={'auto'}>
        <Form.Control type={"date"} size="sm" value={from} onChange={(e)=>setFrom(e.target.value)} />
      </Col>
      <Col md={'auto'}>
        <Form.Control type={"date"} size="sm" value={to} onChange={(e)=>setTo(e.target.value)} />
      </Col>
      <Col md={'auto'}>
        <button onClick={getPackages} className='btn-custom'>Go</button>
      </Col>
    </Row>
    <hr/>
    <div className='table-sm-1 mt-3' style={{maxHeight:500, overflowY:'auto'}}>
      <Table className='tableFixHead'>
        <thead>
          <tr>
            <th>#</th>
            <th>Package</th>
            <th>Customer</th>
            <th>Contact</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Update</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {records?.map((x, index) => {
          return (
          <tr key={index} className='f row-hov'
            onClick={()=> {  }}
          >
            <td> {index+1} </td>
            <td> {x.name} </td>
            <td> {x.customerTitle} {x.customerName} </td>
            <td> {x.customerContact} </td>
            <td> {x.customerEmail} </td>
            <td> {x.status=="1"?<span className='green-txt'>Done</span>:<span className='grey-txt-3'>pending</span>} </td>
            <td> <button className='btn-custom-sm' onClick={()=>togglePackages(x, index)}>Toggle Status</button> </td>
            <td> {moment(x.createdAt).format("DD - MMM - YYYY")} </td>
          </tr>
          )
        })}
        </tbody>
      </Table>
    </div>
  </>
  )
}

export default PackageQueries