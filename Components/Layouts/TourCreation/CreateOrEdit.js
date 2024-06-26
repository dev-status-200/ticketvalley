import React, { useEffect, useReducer } from 'react';
import { useForm, useWatch } from "react-hook-form";
import { Spinner } from 'react-bootstrap';
import PackagesInfo from "./PackagesInfo";
import ImageUpload from './ImageUpload';
import DetailsOne from './DetailsOne';
import DetailsTwo from './DetailsTwo';
import PackageOptions from './PackageOptions';
import Router from 'next/router';
import { Tabs } from 'antd';
import moment from "moment";
import axios from 'axios';
import { reducerFunctions, initialState, baseValues } from './states';
import { openNotification } from "/Components/Shared/Notification";
import dayjs from 'dayjs';

const CreateOrEdit = ({productData, id, packageType}) => {
  const [state, dispatch] = useReducer(reducerFunctions, initialState);
  const {register, control, handleSubmit, reset, formState:{errors} } = useForm({
    defaultValues:state.values
  });

  useEffect(() => {
    let cities = [];
    axios.get(process.env.NEXT_PUBLIC_GET_ALL_CITIES)
    .then((x) => {
      cities = x?.data?.result?.map((y)=>{
        return { id:y.name, name:y.name }
      });
      dispatch({
        type: 'set',
        payload: { cities }
      });
    })
    if(id!="new"){
      let tempState = {...productData.result};
      state.cancellation_polices = tempState?.cancellation_polices?.split("//");
      state.status = tempState.status;
      tempState?.TourOptions?.forEach((x) => {
        if(x.dated){
          let newDates = [];
          x.dates.forEach((y)=>{
            newDates.push(`${moment(y.date).add(1, 'days').format("YYYY/MM/DD")}`)
          })
          x.dates = newDates
        }
      });
      console.log(tempState.cutOff)
      tempState.cutOff = (tempState.cutOff && tempState.cutOff!=undefined )?dayjs(tempState.cutOff, 'HH:mm'):null;
      state.packages = tempState.TourOptions;
      state.timed = tempState.timed;
      state.policies = tempState?.policies?.split("//");
      state.imp_infos = tempState?.imp_infos?.split("//");
      state.why_shoulds = tempState?.why_shoulds?.split("//");
      state.inclusions = tempState?.inclusions?.split("//");
      state.exclusions = tempState?.exclusions?.split("//")||[];
      state.packageDetail = tempState?.travelDetail?.split("//");
      state.stock = tempState.stock;
      state.dated = tempState.dated;
      reset(tempState);

      dispatch({
        type: 'set',
        payload: {
          packageIncludes:JSON.parse(tempState.packageIncludes)||{},
          selectedRecord:productData.result,
          show_image:productData.result.main_image,
          prev_images:productData.result.more_images?productData.result.more_images.split(","):[]
        }
      })
    } else if(id=="new") {
      reset(baseValues);
      dispatch({
        type: 'set',
        payload: {
          packages:[], 
          policies:["In case Tours or Tickets cancelled after Booking 100 % charges will be applicable."],
          cancellation_polices:["In case Tours or Tickets cancelled after Booking 100 % charges will be applicable."],
          imp_infos:[],
          why_shoulds:[],
          exclusions:[],
          inclusions:[],
          more_images:[],
          prev_images:[],
          main_image:"",
        }
      });
    }
  }, [])

  const setValues = (value, field) => {
    dispatch({
      type: 'field',
      fieldName: field, 
      payload: value
    })
  };

  let pageItems = [
    {
      label:`Tour Info`, key:'1', children:<DetailsTwo packageType={packageType} register={register} control={control} state={state} setValues={setValues} dispatch={dispatch} />
    },
    {
      label:`Package Info`, key:'5', children:packageType?
        <PackageOptions register={register} control={control} state={state} setValues={setValues} dispatch={dispatch} />:
        <PackagesInfo register={register} control={control} state={state} setValues={setValues} dispatch={dispatch} />
    },
    {
      label:`Description`, key:'3', children:<DetailsOne register={register} control={control} state={state} setValues={setValues} dispatch={dispatch} />
    },
    {
      label:`Images`, key:'4', children:<ImageUpload state={state} setValues={setValues} dispatch={dispatch} id={id} />
    }
  ]

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
    if(data){
      let result = "";
      data.forEach((x, i)=>{
          result = i==0?result+`${x}` :result + "//" + `${x}`
      })
      return result
    }
  };

  const onSubmit = async(data) => {
    if(
      data.title?.length>3 && 
      data.city?.length>3 && 
      data.category?.length>3 && 
      data.tour_detail?.length>3 && 
      data.duration?.length>3 && 
      data.refund?.length>0 && 
      data.lang?.length>3 && 
      data.voucher?.length>3 && 
      data.time_slot?.length>3 && 
      state.main_image?.name?.length>1 && 
      data.title?.length>3
    ){
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
          packageIncludes:JSON.stringify(state.packageIncludes),
          package:packageType?'1':'0',
          packages:tempPackages,//state.packages,
          stock:state.stock,
          cutOff:(data.cutOff && data.cutOff!=undefined )?dayjs(data.cutOff, 'HH:mm').format("HH:mm"):null,
          travelDetail:makeString(state.packageDetail),
          status:state.status,
          main_image:cover==null?"a":cover,
          more_images:values.length>0? values.toString():"a",
          inclusions:makeString(state.inclusions),
          exclusions:makeString(state.exclusions),
          why_shoulds:makeString(state.why_shoulds),
          imp_infos:makeString(state.imp_infos),
          policies:makeString(state.policies),
          cancellation_polices:makeString(state.cancellation_polices)
        }).then((x)=>{
          console.log(x)
        if(x.data.status=='success'){
          Router.push(`/${packageType?'packageEditPage':'tourEditPage'}?id=${x.data.result.id}`)
        }
      }), 3000)
    } else {
      openNotification("Warning", "In-complete information! please enter the mandatory info with *", 'orange')
    }
  };

  const onEdit = async(data) => {
    // more_images <- New images that are added
    // prev_images <- Previous Images Left after deleting or not deleting either

    dispatch({type:'field', fieldName:'load', payload:true})
    let prev_img = "", value, values=[...state.prev_images];
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
    }
    let tempPackages = await [...state.packages];
    tempPackages.forEach((x)=>{
      if(x.dated){
        let newDates = [];
        x.dates.forEach(async(y)=>{
          await newDates.push({"date":`${moment(y).subtract(1, 'days').format("YYYY-MM-DD")}`})
        })
        x.dates = newDates;
      }
    });
    await axios.post(process.env.NEXT_PUBLIC_EDIT_PRODUCT,
      {
        ...data,
        packageIncludes:JSON.stringify(state.packageIncludes),
        packages:tempPackages,//state.packages,
        travelDetail:makeString(state.packageDetail),
        stock:state.stock,
        prev_img:prev_img,
        cutOff:(data.cutOff && data.cutOff!=undefined )?dayjs(data.cutOff, 'HH:mm').format("HH:mm"):null,
        status:state.status,
        deleted_images:state.deleted_images,
        more_images:values.length>0?values.toString():'',
        inclusions:makeString(state.inclusions),
        exclusions:makeString(state.exclusions),
        why_shoulds:makeString(state.why_shoulds),
        imp_infos:makeString(state.imp_infos),
        policies:makeString(state.policies),
        cancellation_polices:makeString(state.cancellation_polices),
      }
    ).then((x)=>{
      if(x.data.status=='success'){
        openNotification('Success', `Tour Updated!`, 'green')
        Router.push(`/${packageType?'packageEditPage':'tourEditPage'}?id=${id}`)
      } else {
        openNotification('Error', `Something Went Wrong, Try Again!`, 'red')
      }
    })
  };

  const onError = async(data) => { };

  const cutOff = useWatch({control, name:"cutOff"});
  
  return (
  <>
  <form onSubmit={handleSubmit(id!='new'?onEdit:onSubmit, onError)}>
    <Tabs
      defaultActiveKey="1"
      onChange={(e)=>dispatch({type:'toggle', fieldName:'activeTab', payload:e})}
      items={pageItems}
    />
    <div className='pt-3'>
      <button className='btn-custom' type="submit" disabled={state.load?true:false}>{state.load?<Spinner animation="border" size='sm' className='mx-3' />:'Submit'}</button>
    </div>
  </form>
  </>
  )
}
export default React.memo(CreateOrEdit)