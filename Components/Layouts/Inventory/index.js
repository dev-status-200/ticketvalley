import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import { Table, Row, Col, Spinner } from 'react-bootstrap';
import axios from "axios";
import { Button, Input, Popover } from "antd"
import Router from 'next/router';
import { MdOutlineDoDisturbOff, MdRemoveRedEye } from "react-icons/md";
import cookies from "js-cookie";
import moment from 'moment';
import History from './History';

const Inventory = ({inventoryData}) => {

    const [inventory, setInventory] = useState([]);
    const [qrCodes, setQrCodes] = useState([]);
    const [codeLoad, setCodeLoad] = useState(false);
    const [load, setLoad] = useState(false);
    const [search, setSearch] = useState("");
    const [qrSearch, setQrSearch] = useState("");
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

    useEffect(() => {
        setInventories(inventoryData.result); 
    }, [])

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
        setLoad(true)
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

    const showdata = (e) => {
        let codes = [];
        e.Inventories.forEach((x)=>{
            codes.push({...x, check:false})
        })
        setQrCodes(codes)
    }

    const removeCodes = () => {
        setCodeLoad(true)
        let tempCOdes = [];
        qrCodes.forEach((x)=>{
            if(x.check){
                tempCOdes.push(x.code)
            }
        })
        axios.post(process.env.NEXT_PUBLIC_POST_REMOVE_INVENTORY,tempCOdes)
        .then((x)=>{
            // console.log(x.data)
            Router.push("/inventory")
        })
    }

    const content = (
      <>
        {!codeLoad && <>
          <Button type="primary" danger size='small' onClick={removeCodes}>Remove</Button>
          <Input size='small' className='mt-2' onChange={(e)=>setQrSearch(e.target.value)} />
          <hr className='mt-2' />
          <div style={{maxHeight:300, overflowY:'auto'}}>
            {qrCodes.filter((x)=>{
                if(x.code.toLocaleLowerCase().includes(qrSearch.toLocaleLowerCase()) && qrSearch!=""){
                    return x
                } else if(qrSearch=="") {
                    return x
                }
            }).map((x, i)=>{
              return(
              <div key={x.id} className='cur'
                onClick={()=>{
                  let tempState = [...qrCodes];
                  const index = tempState.findIndex((y)=> y.id==x.id)
                  tempState[index].check = !tempState[index].check;
                  setQrCodes(tempState)
                }}
              >
                <input type='checkbox' className='' checked={x.check} /> 
                <span className='mx-3'>{x.code}</span> 
              </div>
            )})}
          </div>
        </>}
        {codeLoad && <Spinner/>}
      </>
    );



  return (
  <div className='p-0'>
    <Row>
      <Col md={1}>
        <span style={{fontSize:20, fontWeight:500}} className='mx-2'>Inventory</span> 
        <History/>
      </Col>
      <Col md={2}>
        <Input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search' />
      </Col>
      <Col md={6}>
      </Col>
      <Col md={2} className='mx-2'>
        <CSVReader cssClass="csv-reader-input"
          onFileLoaded={CreateInventory}
          onError={(e)=>console.log(e)}
          parserOptions={papaparseOptions}
          inputId="ObiWan"
          inputName="ObiWan"
          inputStyle={{color: 'grey'}}
        />  
        <button 
          className={`btn-custom mt-2 ${upload?"":"curr-off"}`} 
          disabled={!upload==true?true:false} 
          onClick={()=>uploadData()}
        >
          {!load?'Upload':<Spinner size='sm' />}
        </button>
      </Col>
    </Row>
    <hr className='mt-1 mb-2' />
    <Row>
      <Col md={12}> 
        <div className='table-sm-1' style={{maxHeight:"60vh", overflowY:'auto', overflowX:'hidden'}}>
        <Table className='tableFixHead '>
          <thead>
            <tr>
              <th style={{maxWidth:5}}>#</th>
              <th>Tour</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inventories?.length>0 && inventories?.filter((x)=>{
              if(search.length>0 && x.title.toLowerCase().includes(search.toLowerCase())){
                return x
              } else if(search.length==0 || search == null) {
                return x
              }
            })?.map((x, index) => {
            return (
            <tr key={index} className=' '>
              <td className='py-4 px-1'>{index+1} </td>
              <td className='fs-16' >
                <Row>
                    <Col md={"auto"}>
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
                        <Col style={{color:'#0b4447', maxWidth:1}}>#{i+1}</Col>
                        <Col md={7} style={{color:'#0b4447'}}>{z.name}</Col>
                        <Col md={2} style={{color:'GrayText'}}>{z.status=="1"?"":<MdOutlineDoDisturbOff style={{float:'right'}} />}</Col>
                        <Col md={"auto"} style={{color:z.Inventories.length==0?"red":'GrayText'}}>{z.Inventories.length}</Col>
                        <Col md={"auto"}>
                        <Popover content={content} title="Qr Codes" trigger="click" placement="leftBottom">
                            <MdRemoveRedEye style={{position:'relative', bottom:1, cursor:'pointer'}}
                                onClick={()=>showdata(z)}
                            />
                        </Popover>
                        </Col>
                    </Row>
                  </Col>
                  <Col md={4} className='py-1 grey-txt fs-13'>
                    <div>
                Last Update: {z.Histories?.length>0? moment(z.Histories[z.Histories?.length-1].createdAt).fromNow() : <span style={{color:'silver'}}>No Update</span>}
                    </div>
                    <div className='fs-12'>
                By: {
                    z.Histories?.length>0?
                    <span style={{color:'green'}}>{z.Histories[z.Histories?.length-1].by}</span>:
                    <span style={{color:'silver'}}>null</span>
                    }
                    </div> 
                  </Col>
                </Row>
                </div>
              )})}</td>
            </tr>
            )})}
          </tbody>
        </Table>
        </div>
      </Col>
    </Row>
  </div>
  )
}

export default React.memo(Inventory)