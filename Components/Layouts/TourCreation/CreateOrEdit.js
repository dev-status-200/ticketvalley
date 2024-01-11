import React, { useEffect, useReducer } from 'react';
import { useForm } from "react-hook-form";
import { Spinner } from 'react-bootstrap';
import PackagesInfo from "./PackagesInfo";
import ImageUpload from './ImageUpload';
import DetailsOne from './DetailsOne';
import DetailsTwo from './DetailsTwo';
import Router from 'next/router';
import { Tabs } from 'antd';
import moment from "moment";
import axios from 'axios';
import { reducerFunctions, initialState, baseValues } from './states';
import { openNotification } from "../../Shared/Notification"

const CreateOrEdit = ({productData, id}) => {

  const [state, dispatch] = useReducer(reducerFunctions, initialState);

  const {register, control, handleSubmit, reset, formState:{errors} } = useForm({
    defaultValues:state.values
  });

  useEffect(() => {
    if(id!="new"){
      //console.log(productData.result.more_images)
      let tempState = {...productData.result};
      state.cancellation_polices = tempState.cancellation_polices.split("//");
      state.status = tempState.status;
      tempState.TourOptions.forEach((x)=>{
        if(x.dated){
          let newDates = [];
          x.dates.forEach((y)=>{
            newDates.push(`${moment(y.date).add(1, 'days').format("YYYY/MM/DD")}`)
          })
          x.dates = newDates
        }
      })
      state.packages = tempState.TourOptions;
      state.timed = tempState.timed;
      state.policies = tempState.policies.split("//");
      //state.timeSlots = tempState.timeSlots.split("//");
      state.imp_infos = tempState.imp_infos.split("//");
      state.why_shoulds = tempState.why_shoulds.split("//");
      state.inclusions = tempState.inclusions.split("//");
      state.prev_images = tempState.more_images.split(",");
      state.stock = tempState.stock;
      state.dated = tempState.dated;
      //state.dates = tempState.dated?JSON.parse(tempState.dates):[{"date":""}]
      reset(tempState);
      // console.log(productData.result.more_images.split(","))
      dispatch({
        type: 'set',
        payload: {
          selectedRecord:productData.result,
          show_image:productData.result.main_image,
          prev_images:productData.result.more_images.split(",")
        }
      })
    } else {
      reset(baseValues)
    }
  }, [])

  const setValues = (value, field) => {
    dispatch({
      type: 'field',
      fieldName: field, 
      payload: value
    })
  };

  function uploadImage(x){
    let value = ''
    const data = new FormData();
    data.append("file", x);
    data.append("upload_preset", "fy9voxjt");
    data.append("cloud_name", "ddkosqihs");
    value = fetch(`https://api.cloudinary.com/v1_1/ddkosqihs/image/upload`, {
        method: "post",
        body: data
    })
      .then(resp => resp.json())
      .then(data => data.url)
      .catch(err => {});

    return value;
  };

  const makeString = (data) => {
    let result = "";
    data.forEach((x, i)=>{
        result = i==0?result+`${x}` :result + "//" + `${x}`
    })
    return result
  };

  const onSubmit = async(data) => {
    dispatch({type:'field', fieldName:'load', payload:true})
    let cover = "a";
    let value;
    let values=[];
    cover = await uploadImage(state.main_image);
    for(let i=0; i<state.more_images.length; i++){
      value = await uploadImage(state.more_images[i]);
      values.push(value)
    }
    let tempPackages = [...state.packages];
    tempPackages.forEach((x)=>{
      if(x.dated){
        let newDates = [];
        x.dates.forEach((y)=>{
          newDates.push({"date":`${moment(y).subtract(1, 'days').format("YYYY-MM-DD")}`})
        })
        x.dates = newDates;
      }
    })
    setTimeout(
      await axios.post(process.env.NEXT_PUBLIC_CREATE_PRODUCT, {
        ...data,
        packages:tempPackages,//state.packages,
        stock:state.stock,
        status:state.status,
        main_image:cover==null?"a":cover,
        more_images:values.length>0? values.toString():"a",
        inclusions:makeString(state.inclusions),
        why_shoulds:makeString(state.why_shoulds),
        imp_infos:makeString(state.imp_infos),
        policies:makeString(state.policies),
        cancellation_polices:makeString(state.cancellation_polices)
      }).then((x)=>{
      if(x.data.status=='success'){
        let tempState = [...state.records];
        tempState.unshift(x.data.result);
        dispatch({type:'field', fieldName:'records', payload:tempState})
        reset(baseValues)
      }
      dispatch({type:'field', fieldName:'load', payload:false})
      dispatch({type: 'modalOff'})
    }), 3000)
  };

  const onEdit = async(data) => {
    dispatch({type:'field', fieldName:'load', payload:true})
    let prev_img = "", value, values=[];
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
      let tempMages = [];
      state.prev_images.forEach((x)=>{
        state.deleted_images.forEach((y)=>{
          if(x!=y){
            tempMages.push(x);
          }
        })
      })
      values = tempMages;
    }
    let tempPackages = [...state.packages];
    tempPackages.forEach((x)=>{
      if(x.dated){
        let newDates = [];
        x.dates.forEach((y)=>{
          newDates.push({"date":`${moment(y).subtract(1, 'days').format("YYYY-MM-DD")}`})
        })
        x.dates = newDates;
      }
    })
    await axios.post(process.env.NEXT_PUBLIC_EDIT_PRODUCT,
      {
        ...data,
        packages:tempPackages,//state.packages,
        stock:state.stock,
        prev_img:prev_img,
        status:state.status,
        deleted_images:state.deleted_images,
        more_images:values.toString(),
        inclusions:makeString(state.inclusions),
        why_shoulds:makeString(state.why_shoulds),
        imp_infos:makeString(state.imp_infos),
        policies:makeString(state.policies),
        cancellation_polices:makeString(state.cancellation_polices),
      }
    ).then((x)=>{
      if(x.data.status=='success'){
        openNotification('Success', `Tour Updated!`, 'green')
        Router.push(`/tourEditPage?id=${id}`)
      } else {
        openNotification('Error', `Something Went Wrong, Try Again!`, 'red')
      }
    })
  };

  const onError = async(data) => { };

  return (
  <>
  <form onSubmit={handleSubmit(id!='new'?onEdit:onSubmit, onError)}>
    <Tabs
      defaultActiveKey="1"
      onChange={(e)=>dispatch({type:'toggle', fieldName:'activeTab', payload:e})}
      items={[
        {
          label:`Tour Info`, key:'1', children:<DetailsTwo register={register} control={control} state={state} setValues={setValues} dispatch={dispatch} />
        },
        {
          label:`Packages Info`, key:'5', children:<PackagesInfo register={register} control={control} state={state} setValues={setValues} dispatch={dispatch} />
        },
        {
          label:`Description`, key:'3', children:<DetailsOne register={register} control={control} state={state} setValues={setValues} dispatch={dispatch} />
        },
        {
          label:`Images`, key:'4', children:<ImageUpload state={state} setValues={setValues} dispatch={dispatch} id={id} />
        }
      ]}
    />
    <div className='pt-3'>
      <button className='btn-custom' type="submit" disabled={state.load?true:false}>{state.load?<Spinner animation="border" size='sm' className='mx-3' />:'Submit'}</button>
    </div>
  </form>
  </>
  )
}
export default CreateOrEdit
