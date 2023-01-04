import React, {useEffect} from 'react';
import { Input, Tabs } from 'antd';
import { Row, Col, Spinner } from 'react-bootstrap';
import {CloseCircleOutlined} from '@ant-design/icons';
import DetailsOne from './DetailsOne';
import DetailsTwo from './DetailsTwo';
import axios from 'axios';
import Router from 'next/router';
import ImageUpload from './ImageUpload';

const CreateOrEdit = ({state, dispatch}) => {

  const setValues = (value, field) => {
    dispatch({
      type: 'field',
      fieldName: field, 
      payload: value
    })
  }

  function uploadImage(x){
    let value = ''
    const data = new FormData();
    data.append("file", x)
    data.append("upload_preset", "g4hjcqh7")
    data.append("cloud_name", "abdullah7c")
    value = fetch(`https://api.cloudinary.com/v1_1/abdullah7c/image/upload`, {
        method: "post",
        body: data
    })
        .then(resp => resp.json())
        .then(data => data.url)
        .catch(err => console.log(err));

    return value;
}

  const handleSubmit = async(e) => {
    e.preventDefault();
    let values;
    console.log(state.more_images)
    // for(let i = 0; i<state.more_images.length; i++){
    //     values = await uploadImage(state.more_images[i]);
    //     console.log(values)
    // }
    dispatch({type:'field', fieldName:'load', payload:true})
    setTimeout(
      await axios.post(process.env.NEXT_PUBLIC_CREATE_PRODUCT,
        {
          title:state.title,
          main_image:await(uploadImage(state.main_image)),
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
        if(x.data.status=='success'){
          let tempState = [...state.records];
          tempState.unshift(x.data.result);
          dispatch({type:'field', fieldName:'records', payload:tempState})
        }
        dispatch({type:'field', fieldName:'load', payload:false})
        dispatch({type: 'modalOff'})
      }), 3000)
  }

  return (
    <div className='pt-2'>
      <Tabs
        defaultActiveKey="1"
        onChange={(e)=>dispatch({type:'toggle', fieldName:'activeTab', payload:e})}
        //onChange={(e)=>console.log(e)}
        items={[
          {
            label: `Description`,
            key: '1',
            children:<DetailsOne state={state} setValues={setValues} dispatch={dispatch} />
          },
          {
            label: `Tour Info`,
            key: '2',
            children:<DetailsTwo state={state} setValues={setValues} dispatch={dispatch} />
          },
          {
            label: `Images`,
            key: '3',
            children:<ImageUpload state={state} setValues={setValues} dispatch={dispatch} />
          }
        ]}
      />
      <form onSubmit={handleSubmit}>
        <Col md={12} className='pt-3'>
        <button className='btn-custom' type="submit" disabled={state.load?true:false}>{state.load?<Spinner animation="border" size='sm' className='mx-3' />:'Submit'}</button>
        </Col>
      </form>
    </div>
  )
}

export default CreateOrEdit