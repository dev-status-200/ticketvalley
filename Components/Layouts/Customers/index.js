import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { MailOutlined } from '@ant-design/icons';

const Customers = ({data}) => {

    const [records, setRecords] = useState([]);

    useEffect(() => {
        let temp = [];
        if(data.result){
            data.result.forEach((x, i)=>{
                temp.push({...x})
                x.BookedTours.forEach((y)=>{
                    temp[i].bookings = x.BookedTours.length;
                })
            })
            setRecords(temp);
        }
    }, [data])
    
  return (
    <div>
        <div>Customers</div>
        <Row>
            <Col md={12}>
                <hr/>
            <div className='table-sm-1' style={{maxHeight:"60vh", overflowY:'auto', overflowX:'hidden'}}>
                <Table className='tableFixHead'>
                <tbody>
                {records.map((x, index) => {
                return (
                <tr key={index} className=' my-0 py-0'>
                    <td className='fs-16' style={{maxWidth:1}}>
                        {index+1}
                    </td>
                    <td className='fs-16' style={{maxWidth:20}}>
                        <img src={x.image} style={{borderRadius:"100%", position:'relative', bottom:7}}  height={40} />
                    </td>
                    <td >{x.name}</td>
                    <td><MailOutlined style={{position:'relative', bottom:3}} className='mx-2' />{x.email}</td>
                    <td>
                    Total Bookings: <b style={{color:'green'}}> {x.bookings}</b>
                    </td>
                </tr>
                )
                })}
                </tbody>
                </Table>
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Customers