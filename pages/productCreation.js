import React from 'react';
import TourCreation from '../Components/Layouts/TourCreation';
import axios from 'axios';
import Cookies from 'cookies';

const tourCreation = ({productData}) => {
  return (
    <TourCreation productData={productData} />
  )
}

export default tourCreation
//NEXT_PUBLIC_GET_ALL_PRODUCTS
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

  return{
      props: { productData: productData }
  }
}