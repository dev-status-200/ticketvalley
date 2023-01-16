import React from 'react';
import TourCreation from '../Components/Layouts/TourCreation';
import axios from 'axios';
import Cookies from 'cookies';

const tourCreation = ({productData, transportData}) => {
  return (
    <TourCreation productData={productData} transportData={transportData} />
  )
}

export default tourCreation

export async function getServerSideProps({req,res}){
  const cookies = new Cookies(req, res)
  // const sessionRequest = await axios.get(process.env.NEXT_PUBLIC_EVE_AUTHENTICATE_TOKEN,{
  //     headers:{
  //         "x-access-token": `${cookies.get('token')}`
  //     }
  // }).then((x)=>x.data);
  // const sessionData = await sessionRequest

  const request = await axios.get(process.env.NEXT_PUBLIC_GET_ALL_PRODUCTS)
  const productData = await request.data
  const transportData = await axios.get(process.env.NEXT_PUBLIC_GET_TRANSPORT).then((x)=>x.data.result)

  return{
      props: { productData: productData, transportData:transportData }
  }
}