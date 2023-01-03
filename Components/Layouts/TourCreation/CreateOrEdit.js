import React, {useEffect} from 'react';
import { Input, Tabs } from 'antd';
import { Row, Col, Spinner } from 'react-bootstrap';
import {CloseCircleOutlined} from '@ant-design/icons';
import DetailsOne from './DetailsOne';
import DetailsTwo from './DetailsTwo';
import axios from 'axios';
import Router from 'next/router';

const CreateOrEdit = ({state, dispatch}) => {
  const setValues = (value, field) => {
    dispatch({
      type: 'field',
      fieldName: field, 
      payload: value
    })
  }

  useEffect(() => {

  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch({type:'toggle', fieldName:'load', payload:true})
      await axios.post(process.env.NEXT_PUBLIC_CREATE_PRODUCT,
        {
          title:state.title,
          availability:state.availability,
          duration:state.duration,
          time_slot:state.time_slot,
          transport:state.transport,
          confirmation:state.confirmation,
          refund:state.refund,
          voucher:state.voucher,
          lang:state.lang,
          tour_detail:state.tour_detail,
          price:state.price,
          departure:state.departure,
          reporting:state.reporting,
          meals:state.meals,
          inclusions:state.inclusions.toString(),
          why_shoulds:state.why_shoulds.toString(),
          imp_infos:state.imp_infos.toString(),
          policies:state.policies.toString()
        }
      ).then((x)=>{
        console.log(x.data.result)
        //if(x.data.status=='success'){
          let tempState = [...state.records];
          tempState.push(x.data.result);
          dispatch({type:'toggle', fieldName:'records', payload:tempState})
          Router.push('/productCreation')
        //}
        dispatch({type:'toggle', fieldName:'load', payload:false})
      })
  }

  return (
    <div className='pt-2'>
      <Tabs
        defaultActiveKey="1"
        onChange={(e)=>dispatch({type:'toggle', fieldName:'activeTab', payload:e})}
        //onChange={(e)=>console.log(e)}
        items={[
          {
            label: `Details Pane 1`,
            key: '1',
            children:<DetailsOne state={state} setValues={setValues} dispatch={dispatch} />
          },
          {
            label: `Details Pane 2`,
            key: '2',
            children:<DetailsTwo state={state} setValues={setValues} dispatch={dispatch} />
          }
        ]}
      />
        <form onSubmit={handleSubmit}>
        <Col md={12} className='pt-3'>
        <button className='btn-custom' type="submit">{state.load?<Spinner animation="border" size='sm' className='mx-3' />:'Submit'}</button>
        </Col>
        </form>
    </div>
  )
}

export default CreateOrEdit