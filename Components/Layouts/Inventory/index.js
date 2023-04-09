import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import { Table, Row, Col } from 'react-bootstrap';
import axios from "axios";
import Router from 'next/router';

const Inventory = ({inventoryData}) => {

    const [inventory, setInventory] = useState([]);
    const [upload, setUpload] = useState(false);
    const [inventories, setInventories] = useState([
        {TourOptions:[{Inventories:[]}]}
    ]);

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
    }

    useEffect(() => { console.log(inventoryData); setInventories(inventoryData.result); }, [])
    useEffect(() => {
        if(inventory.length>0){
            setUpload(true);
        } else {
            setUpload(false);
        }
    }, [inventory])

    const CreateInventory = (data) => {
        let values = data;
        values.forEach((x, i)=>{
            values[i].TourOptionId =  x.TourOptionId.replace('i', '');
        })
        console.log(values);
        setInventory(values)
    }

    const uploadData = async() => {
        await axios.post(process.env.NEXT_PUBLIC_CREATE_INVENTORY, inventory)
        .then((x)=>{
            console.log(x.data);
            Router.push("/inventory")
        })
    }

  return (
    <div>
        <>
        <h3>Upload Inventory</h3>
        <CSVReader
            cssClass="csv-reader-input"
            onFileLoaded={CreateInventory}
            onError={(e)=>console.log(e)}
            parserOptions={papaparseOptions}
            inputId="ObiWan"
            inputName="ObiWan"
            inputStyle={{color: 'red'}}
        />
        </>
        <hr/>
        {upload && 
            <div>
                <button className='btn-custom' onClick={()=>uploadData()}>Upload</button>
            </div>
        }
        <Row>
            <Col md={10}>
                <div className='table-sm-1 mt-3 px-2' style={{maxHeight:470, overflowY:'auto', overflowX:'hidden'}}>
                <Table className='tableFixHead '>
                <thead>
                <tr>
                    <th>Sr.</th>
                    <th>Tour</th>
                    <th>Options Stock</th>
                </tr>
                </thead>
                <tbody>
                {inventories.map((x, index) => {
                return (
                <tr key={index} className='f'>
                    <td>{index+1} </td>
                    <td className='fs-18 fw-500'>{x.title}</td>
                    <td style={{width:500}}>{x.TourOptions.map((z, i)=>{
                        return(
                            <Row key={i}>
                                <Col md={10} style={{color:'#0b4447'}}>#{i+1} {z.name}</Col>
                                <Col md={1} style={{color:z.Inventories.length==0?"red":'GrayText'}}>{z.Inventories.length}</Col>
                                <Col md={1}></Col>
                                {x.TourOptions.length-1 > i &&<Col md={12}><hr className='my-1' /></Col>}
                            </Row>
                        )
                    })}</td>
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