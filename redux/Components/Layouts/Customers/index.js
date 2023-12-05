import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { MailOutlined } from '@ant-design/icons';
import { Modal, Input } from 'antd';
import CreateOffer from './CreateOffer';
import moment from "moment";

const Customers = ({data, promoData}) => {

    const [search, setSearch] = useState("");
    const [records, setRecords] = useState([{MyOffers:[]}]);
    const [promos, setPromos] = useState([]);
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState(
        `
        <p>Get Flat Discount on your next ticket!</p>
        <p>Hurry up & grab the offer before.</p>
        <p></p>
        <p></p>
        `
        );

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
            setPromos(promoData.result);
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
                if(x.name?.toLowerCase().includes(search.toLowerCase()) || x.email?.toLowerCase().includes(search.toLowerCase())){
                    return x
                }else if(search=="") {
                    return x
                }
            }).map((x,index) => {
            return (
            <tr key={index} className=''>
                <td className='fs-16' style={{maxWidth:1}}>
                    {index+1}
                </td>
                <td className='fs-16' style={{maxWidth:30}}>
                    <img src={x.image} style={{borderRadius:"100%", position:'relative', bottom:7}}  height={40}  alt="Tour" />
                </td>
                <td >{x.name}</td>
                <td><MailOutlined style={{position:'relative', bottom:3}} className='mx-2' />{x.email}</td>
                <td>
                Total Bookings: <b style={{color:'green'}}> {x.bookings}</b>
                </td>
                <td>
                {x.MyOffers.length>0?`Last:  ${moment(x.MyOffers[0].createdAt).fromNow()}`:""}
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
      centered
      open={visible}
      onOk={()=>setVisible(false)} onCancel={()=>setVisible(false)}
      width={500} footer={false} 
    >
       <CreateOffer content={content} setContent={setContent} records={records} promos={promos} />
    </Modal>
    </div>
  )
}

export default Customers