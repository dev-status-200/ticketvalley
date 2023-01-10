import { useForm, useWatch, useFormContext } from "react-hook-form";
import {CloseCircleOutlined} from '@ant-design/icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { Row, Col, Spinner } from 'react-bootstrap';
import ImageUpload from './ImageUpload';
import React, {useEffect} from 'react';
import DetailsOne from './DetailsOne';
import DetailsTwo from './DetailsTwo';
import { Input, Tabs } from 'antd';
import Router from 'next/router';
import axios from 'axios';

const CreateOrEdit = ({state, dispatch, baseValues}) => {

  const {register, control, handleSubmit, reset, formState:{errors} } = useForm({
    defaultValues:state.values
  });

  useEffect(() => {
    if(state.edit){
      let tempState = {...state.selectedRecord};
      console.log(tempState)
      state.terms_conditions = tempState.terms_conditions.split(",");
      state.cancellation_polices = tempState.cancellation_polices.split(",");
      state.policies = tempState.policies.split(",");
      state.imp_infos = tempState.imp_infos.split(",");
      state.why_shoulds = tempState.why_shoulds.split(",");
      state.inclusions = tempState.inclusions.split(",");
      reset(tempState);
    }
    if(!state.edit){ reset(baseValues) }
  }, [state.selectedRecord])

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

  const onSubmit = async(data) => {

    dispatch({type:'field', fieldName:'load', payload:true})
    let cover;
    let value;
    let values=[];
    cover = await uploadImage(state.main_image);
    for(let i = 0; i<state.more_images.length; i++){
      value = await uploadImage(state.more_images[i]);
      values.push(value)
    }
    setTimeout(
      await axios.post(process.env.NEXT_PUBLIC_CREATE_PRODUCT,
        {
          ...data,
          main_image:cover,
          inclusions:state.inclusions.toString(),
          why_shoulds:state.why_shoulds.toString(),
          imp_infos:state.imp_infos.toString(),
          more_images:values.toString(),
          policies:state.policies.toString(),
          cancellation_polices:state.cancellation_polices.toString(),
          terms_conditions:state.terms_conditions.toString(),
        }
      ).then((x)=>{
        if(x.data.status=='success'){
          let tempState = [...state.records];
          tempState.unshift(x.data.result);
          dispatch({type:'field', fieldName:'records', payload:tempState})
          reset(baseValues)
        }
        dispatch({type:'field', fieldName:'load', payload:false})
        dispatch({type: 'modalOff'})
      }), 3000)
  }

  const onEdit = async(data) => {
    dispatch({type:'field', fieldName:'load', payload:true});
    delete data.main_image;
    delete data.more_images;

    console.log(data)

    if(state.main_image){
      console.log(state.main_image)
      let cover;
      cover = await uploadImage(state.main_image);
      data.main_image = cover;
    }
    
    setTimeout(
      await axios.post(process.env.NEXT_PUBLIC_EDIT_PRODUCT,
        {
          ...data,
          inclusions:state.inclusions.toString(),
          why_shoulds:state.why_shoulds.toString(),
          imp_infos:state.imp_infos.toString(), 
          policies:state.policies.toString(),
          cancellation_polices:state.cancellation_polices.toString(),
          terms_conditions:state.terms_conditions.toString(),
        }
      ).then((x)=>{
        console.log(x.data);
        if(x.data.status=='success'){

          Router.push("/productCreation")

          dispatch({type:'modalOff'});
          //openNotification('Success', `Job For ${x.data.result.Client.name} Updated!`, 'green')
      }
        dispatch({type:'field', fieldName:'load', payload:false});
        dispatch({type: 'modalOff'})
      }), 3000)
  };

  const onError = async(data) => { };

  return (
    <div className='pt-2'>
      <form onSubmit={handleSubmit(state.edit?onEdit:onSubmit, onError)}>
      <Tabs
        defaultActiveKey="1"
        onChange={(e)=>dispatch({type:'toggle', fieldName:'activeTab', payload:e})}
        items={[
          {
            label: `Description`,
            key: '1',
            children:<DetailsOne register={register} control={control} state={state} setValues={setValues} dispatch={dispatch} />
          },
          {
            label: `Tour Info`,
            key: '2',
            children:<DetailsTwo register={register} control={control} state={state} setValues={setValues} dispatch={dispatch} />
          },
          {
            label: `Images`,
            key: '3',
            children:<ImageUpload state={state} setValues={setValues} dispatch={dispatch} />
          }
        ]}
      />
      <Col md={12} className='pt-3'>
        <button className='btn-custom' type="submit" disabled={state.load?true:false}>{state.load?<Spinner animation="border" size='sm' className='mx-3' />:'Submit'}</button>
      </Col>
      </form>
    </div>
  )
}

export default CreateOrEdit