import { useForm } from "react-hook-form";
import { Spinner } from 'react-bootstrap';
import ImageUpload from './ImageUpload';
import React, {useEffect} from 'react';
import DetailsOne from './DetailsOne';
import DetailsTwo from './DetailsTwo';
import { Tabs } from 'antd';
import Router from 'next/router';
import axios from 'axios';

const CreateOrEdit = ({state, dispatch, baseValues}) => {

  const {register, control, handleSubmit, reset, formState:{errors} } = useForm({
    defaultValues:state.values
  });

  useEffect(() => {
    if(state.edit){
      let tempState = {...state.selectedRecord};
      state.terms_conditions = tempState.terms_conditions.split(",");
      state.cancellation_polices = tempState.cancellation_polices.split(",");
      state.status = tempState.status;
      state.policies = tempState.policies.split(",");
      state.imp_infos = tempState.imp_infos.split(",");
      state.why_shoulds = tempState.why_shoulds.split(",");
      state.inclusions = tempState.inclusions.split(",");
      state.inclusions = tempState.inclusions.split(",");
      state.prev_images = tempState.more_images.split(",");
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
        .catch(err => {});

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
          status:state.status,
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
    let prev_img = "";
    let value;
    let values=[];
    if(state.main_image){
      prev_img = data.main_image
      delete data.main_image; // this has the previous image
      //delete data.more_images;
      let cover;
      cover = await uploadImage(state.main_image); // this has the new image
      data.main_image = cover;
    }else{
      delete data.main_image;
    }
    if(state.more_images.length>0){
      for(let i = 0; i<state.more_images.length; i++){
        value = await uploadImage(state.more_images[i]);
        values.push(value)
      }
      state.prev_images.forEach((x)=>{
        values.push(x)
      })
    }
    if(state.deleted_images.length>0 && state.more_images.length==0){
      console.log("Function Hit")
      let tempMages = [];
      state.prev_images.forEach((x)=>{
        state.deleted_images.forEach((y)=>{
          if(x!=y){
            tempMages.push(x);
          }
        })
      })
      values = tempMages;
      console.log(values)
    }
    setTimeout(
      await axios.post(process.env.NEXT_PUBLIC_EDIT_PRODUCT,
        {
          ...data,
          prev_img:prev_img,
          status:state.status,
          more_images:values.toString(),
          deleted_images:state.deleted_images,
          inclusions:state.inclusions.toString(),
          why_shoulds:state.why_shoulds.toString(),
          imp_infos:state.imp_infos.toString(), 
          policies:state.policies.toString(),
          cancellation_polices:state.cancellation_polices.toString(),
          terms_conditions:state.terms_conditions.toString(),
        }
      ).then((x)=>{
        if(x.data.status=='success'){
          dispatch({type:'modalOff'});
          Router.push("/productCreation")
          //openNotification('Success', `Job For ${x.data.result.Client.name} Updated!`, 'green')
      }
      }), 3000)
  };

  const onError = async(data) => { };

  return (
    <div className=''>
      <form onSubmit={handleSubmit(state.edit?onEdit:onSubmit, onError)}>
      <Tabs
        defaultActiveKey="1"
        onChange={(e)=>dispatch({type:'toggle', fieldName:'activeTab', payload:e})}
        items={[
          {
            label: `Tour Info`,
            key: '1',
            children:<DetailsTwo register={register} control={control} state={state} setValues={setValues} dispatch={dispatch} />
          },
          {
            label: `Description`,
            key: '2',
            children:<DetailsOne register={register} control={control} state={state} setValues={setValues} dispatch={dispatch} />
          },
          {
            label: `Images`,
            key: '3',
            children:<ImageUpload state={state} setValues={setValues} dispatch={dispatch} />
          }
        ]}
      />
      <div className='pt-3'>
        <button className='btn-custom' type="submit" disabled={state.load?true:false}>{state.load?<Spinner animation="border" size='sm' className='mx-3' />:'Submit'}</button>
      </div>
      </form>
    </div>
  )
}

export default CreateOrEdit