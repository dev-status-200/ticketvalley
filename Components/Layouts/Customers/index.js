import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { MailOutlined } from '@ant-design/icons';
import { Modal, Input } from 'antd';
import CreateOffer from './CreateOffer';

const Customers = ({data}) => {

    const [search, setSearch] = useState("");
    const [records, setRecords] = useState([]);
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState('<p>Yo Brotherzzzzz</p>');

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
        <Row>
            <Col md={3}>
            <div>Customers</div>
            <div><Input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search' /></div>
            </Col>
            <Col md={7}></Col>
            <Col md={2}>
            <button className='btn-custom' onClick={()=>setVisible(true)}>Create Offer</button>
            </Col>
        </Row>
    <Row>
        <Col md={12}>
        <hr/>
        <div className='table-sm-1' style={{maxHeight:"60vh", overflowY:'auto', overflowX:'hidden'}}>
            <Table className='tableFixHead'>
            <tbody>
            {records.filter((x)=>{ 
                if(x.name.toLowerCase().includes(search.toLowerCase()) || x.email.toLowerCase().includes(search.toLowerCase())){
                    return x
                }else if(search=="") {
                    return x
                }
            }).map((x, index) => {
            return (
            <tr key={index} className=' my-0 py-0'>
                <td className='fs-16' style={{maxWidth:1}}>
                    {index+1}
                </td>
                <td className='fs-16' style={{maxWidth:30}}>
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
    <Modal
    title="CREATE AND SEND OFFERS"
      open={visible}
      onOk={()=>setVisible(false)} onCancel={()=>setVisible(false)}
      width={800} footer={false} 
    >
       <CreateOffer content={content} setContent={setContent} records={records} />
    </Modal>
    </div>
  )
}

export default Customers