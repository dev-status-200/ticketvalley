import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import { Table, Row, Col } from 'react-bootstrap';
import axios from "axios";
import Router from 'next/router';
import {MdOutlineDoDisturbOff} from "react-icons/md";
import cookies from "js-cookie";
import moment from 'moment';
import History from './History';

const Inventory = ({inventoryData}) => {

    const [inventory, setInventory] = useState([]);
    const [upload, setUpload] = useState(false);
    const [inventories, setInventories] = useState([
        {TourOptions:[
            {Inventories:[], Histories:[]}
        ]}
    ]);

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
    }

    useEffect(() => { setInventories(inventoryData.result); }, [])
    useEffect(() => {
        if(inventory.length>0){
            setUpload(true);
        } else {
            setUpload(false);
        }
    }, [inventory])

    const CreateInventory = (data) => {
        let values = data;
        values.forEach((x, i)=>{ values[i].TourOptionId =  x.TourOptionId.replace('i', '')})
        setInventory(values)
    }

    const uploadData = async() => {
        let loginId = await cookies.get("loginId");
        let username = await cookies.get("username");
        let log = ``;
        log = `user ${username} uploaded a Inventory of ${inventory.length} products on ${moment().format("DD-MMM-YYYY hh:mm A")}`;
        let codes = [];
        inventory.forEach((x)=>codes.push(x.code));
        //console.log(inventory)
        await axios.post(process.env.NEXT_PUBLIC_CREATE_INVENTORY, {inventory, codes, username})
        .then((x)=>{
            //console.log(x.data)
            Router.push("/inventory");
        })
    }

  return (
    <div className='p-0'>
        <Row>
        <Col md={8}><span style={{fontSize:20, fontWeight:500}}>Inventory</span> <History/></Col>
        <Col md={1} className='mx-2'>
            <button className={`btn-custom ${upload?"":"curr-off"}`} disabled={!upload==true?true:false} onClick={()=>uploadData()}>Upload</button>
        </Col>
        <Col md={1} className='py-1'>
        <CSVReader cssClass="csv-reader-input"
            onFileLoaded={CreateInventory}
            onError={(e)=>console.log(e)}
            parserOptions={papaparseOptions}
            inputId="ObiWan"
            inputName="ObiWan"
            inputStyle={{color: 'grey'}}
            />  
        </Col>
        </Row>
        <hr className='mt-1 mb-2' />
        <Row>
            <Col md={12}> 
                <div className='table-sm-1' style={{maxHeight:"60vh", overflowY:'auto', overflowX:'hidden'}}>
                <Table className='tableFixHead '>
                <thead>
                <tr>
                    <th style={{maxWidth:5}}>Sr.</th>
                    <th>Tour</th>
                    <th>Stock</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {inventories?.map((x, index) => {
                return (
                <tr key={index} className=' '>
                    <td className='py-4 px-1'>{index+1} </td>
                    <td className='fs-16' >
                        <Row>
                            <Col md={4}>
                                <img src={x.main_image}  style={{borderRadius:5, maxHeight:80, maxWidth:100, imageRendering:"pixelated"}}  alt="Tour" />
                            </Col>
                            <Col>
                                <span className=''>{x.title}</span>
                            </Col>
                        </Row>
                    </td>
                    <td style={{minWidth:620}}>
                    {x.TourOptions.map((z, i)=>{
                    return(
                        <div key={i}>
                        <Row>
                        <Col md={8}>
                        <Row className='inventory-opt-list my-1 fs-12' >
                            <Col style={{color:'#0b4447', maxWidth:1}}>{i+1}</Col>
                            <Col md={8} style={{color:'#0b4447'}}>{z.name}</Col>
                            <Col md={2} style={{color:'GrayText'}}>{z.status=="1"?"":<MdOutlineDoDisturbOff style={{float:'right'}} />}</Col>
                            <Col md={1} style={{color:z.Inventories.length==0?"red":'GrayText'}}>{z.Inventories.length}</Col>
                        </Row>
                        </Col>
                        <Col md={4} className='py-1 grey-txt fs-13'>
                        <div>
                        Last Update: {z.Histories.length>0? moment(z.Histories[z.Histories.length-1].createdAt).fromNow() : <span style={{color:'silver'}}>No Update</span>}
                        </div>
                        <div className='fs-12'>
                        By: {
                            z.Histories.length>0?
                            <span style={{color:'green'}}>{z.Histories[z.Histories.length-1].by}</span>:
                            <span style={{color:'silver'}}>null</span>
                            }
                        </div>
                        </Col>
                        </Row>
                        </div>
                    )})}</td>
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

export default Inventory