import React, { useReducer, useMemo } from 'react';
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import { Modal, Switch } from 'antd';
import BookingInfo from './BookingInfo';
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function recordsReducer(state, action){
  switch (action.type) {
    case 'toggle': { 
      return { ...state, [action.fieldName]: action.payload } 
    }
    case 'set': { 
      return { ...state, ...action.payload } 
    }
    case 'select': {
      return {
        ...state,
        selectedRecord:{},
        visible: true,
        selectedRecord:action.payload
      }
    }
    case 'modalOff': {
      let returnVal = { ...state, visible: false };
      return returnVal
    }
    default: return state 
  }
}
const baseValues = {
  //Basic Info
  id:'',
  name:"",
  amount:0.0,
  code:"",
  validity:"",
  stock:0
}
const initialState = {
  records: [],
  load:false,
  inventory: [],
  transports: [],
  load:false,
  visible:false,
  edit:false,
  values:baseValues,
  status:"1",
  byPercentage:"0",
  assigned:false,
  search:"",
  selectedRecord:{},
  assignLoad:false,

  from:moment().subtract(7,'days').format("YYYY-MM-DD"),
  to:moment().format("YYYY-MM-DD"),
};

const Bookings = () => {

  const [ state, dispatch ] = useReducer(recordsReducer, initialState);
  const getInventoryTickets = (id, data) => {
    let result = [];
    data.forEach((x)=>{
      if(x.TourOptionId==id){
        result.push(x)
      }
    })
    return result
  }

  const getBooking = async() => {
    dispatch({type:'set', payload:{
      load:true,
    }});
    await axios.get(process.env.NEXT_PUBLIC_CREATE_GET_ALL_RESERVATIONS,{
      headers:{
        from:state.from,
        to:state.to
      }
    }).then((x)=>{
      let bookingsData = x.data;
      let tempValues = bookingsData.result;
      let tempBookings = []
      tempValues?.forEach((x)=>{
        x.assigningLeft = 0;
        x.date = moment(x.createdAt).format("DD-MM-YYYY")
        x.booking_no = `${x.booking_no}`;
        x.BookedTours.forEach((y)=>{
          y.BookedToursOptions.forEach((z)=>{
            tempBookings.push({
              ...z,
              id:x.id,
              payment_intent:x.payment_intent,
              payment_intent_client_secret:x.payment_intent_client_secret,
              promo:x.promo,
              name:y.customerTitle + ' ' + y.customerName,
              contact:y.customerContact,
              email:x.email,
              site:x.site,
              tourId:y.tourId,
              BookedTourName:y.name,
              BookedTourOptionId:z.id,
              image:y.image,
              booking_no:x.booking_no,
              base_price:x.base_price,
              assigningLeft: 0,
              fromNow:moment(x.createdAt).fromNow(),
              createdAt: moment(x.createdAt).format("DD-MM-YYYY"),
              booking_no: `${x.booking_no}`,
              inventory:getInventoryTickets(z.TourOptionId, bookingsData.resultTwo),
              assigningLeft : z.assigned=="0"?x.assigningLeft+1: x.assigningLeft+ 0,
              date:moment(z.date).format("DD-MM-YYYY")
            })
            z.inventory=getInventoryTickets(z.TourOptionId, bookingsData.resultTwo);
            x.assigningLeft = z.assigned=="0"?x.assigningLeft+1: x.assigningLeft+ 0
          })
        })
      });
      dispatch({type:'set', payload:{
        inventory:bookingsData.resultTwo,
        records:tempBookings,
        transports:bookingsData.transports,
        load:false
      }});
      checkNotifications();
    })
  }

  const checkNotifications = () => {
    axios.post(process.env.NEXT_PUBLIC_POST_CHECK_NOTIFICATION,{
      type:'tour'
    }).then((x)=>{
      // console.log(x.data)
    })
  }

  const onChange = (e) => 
    dispatch({type:'set', payload:{
      assigned:e
  }});

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  const colDefs = [
    { 
      headerName:"", 
      floatingFilter: false,
      cellRenderer:(params)=> <EyeOutlined className='cur row-hov lt-blue-txt' onClick={()=>dispatch({type:'select', payload:params.data})} />,
      width:20
    },
    { headerName:"No.#", field: "booking_no", cellRenderer:(p)=>`#${p.value}`,  width:100},
    { field: "site",
    width:100,
    cellRenderer:(params)=>{
      return <div 
        style={{
          backgroundColor:params.value=="peaceland"?'greenyellow':'yellow',
          textAlign:'center',
          fontSize:10
        }}
      >
        {params.value}
      </div>
    },
    },
    { 
      headerName:"Tour",
      flex:1,
      minWidth:250,
      cellRenderer:(params)=>{
        return <div style={{lineHeight:1.3}}>
          <span>{params.data.BookedTourName}</span>
          <br/>
          <span className='grey-txt-2 fs-12'># {params.data.tourOptName}</span>
        </div>
      },
      valueGetter:(params)=> params.data.BookedTourName + ' ' + params.data.tourOptName
    },
    { headerName:"Customer", field:"name" },
    { 
      headerName:"Contact",
      cellRenderer:(params)=>{
        return <div style={{lineHeight:1.3}}>
          <span>{params.data.email}</span>
          <br/>
          <span className='grey-txt-2'>{params.data.contact}</span>
        </div>
      },
      valueGetter:(params)=> params.data.email + ' ' + params.data.contact
    },
    { headerName:"Created At", field: "createdAt", width:150,
      cellRenderer:(params)=>{
        return <div style={{lineHeight:1.3}}>
          <span>{params.value}</span>
          <br/>
          <span className='grey-txt-2'>{`${params.data.fromNow}`}</span>
        </div>
      },
    },
    { headerName:"Trip Date", field: "date", width:150 },
    { headerName:"Ticketing", width:120,
      cellRenderer:(params)=>{
        return <div>
          {params.data.TourOption.manual?"Manual":"Auto"}
        </div>
      },
      valueGetter:(params)=> params.data.TourOption.manual?"Manual":"Auto"
    },
  ];

  return (
  <>
    <Row>
      <Col md={4}><h5>Bookings</h5></Col>
      <Col md={1}></Col>
      <Col md={2} className='d-flex'>
          <div className='py-1 mx-1'>From: </div>
          <Form.Control type={"date"} size="sm" value={state.from} onChange={(e)=>dispatch({type:"set", payload:{from:e.target.value}})} />
      </Col>
      <Col md={2} className='d-flex'>
        <div className='py-1 mx-1'>To: </div>
        <Form.Control type={"date"} size="sm" value={state.to} onChange={(e)=>dispatch({type:"set", payload:{to:e.target.value}})} />
      </Col>
      <Col md={1}>
        <button className='btn-custom' onClick={getBooking}>Go</button>
      </Col>
      {/* <Col md={2}>
        <Input value={state.search} allowClear onChange={(e)=>dispatch({type:"set", payload:{search:e.target.value}})} placeholder='Search Bookings' />
      </Col> */}
      <Col md={2} className='pt-1'>
        {state.assigned?"Assigned":"Pending"}
        <Switch checked={state.assigned} onChange={onChange} className='mx-2' />
      </Col>
    </Row>
    {!state.load &&
    <Row>
    <Col md={12}>
      <div
        className="ag-theme-quartz"
        style={{height:'65vh', width:'100%', marginTop:20}}
      >
        <AgGridReact
          rowData={state.records.filter((x)=> { if(state.assigned){return x.assigningLeft==0}else{return x.assigningLeft!=0} }).map((x)=>{return {...x}})}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
    </Col>
    </Row>
    }
    {state.load && <div className='p-5 text-center'><Spinner/></div> }
    <Modal open={state.visible} width={1000} footer={false} centered
      onOk={()=>dispatch({ type: 'modalOff' })} onCancel={()=>dispatch({ type: 'modalOff' })}
    >
      <BookingInfo state={state} dispatch={dispatch} getBooking={getBooking} />
    </Modal>
  </>
  )
}

export default React.memo(Bookings)