import React from 'react';
import TourCreation from '../Components/Layouts/TourCreation';
import axios from 'axios';
import Cookies from 'cookies';

const tourCreation = ({productData}) => {
  return (
    <TourCreation productData={productData} packageType={false} />
  )
}

export default tourCreation

export async function getServerSideProps({req,res}){
  const cookies = new Cookies(req, res)

  const request = await axios.get(process.env.NEXT_PUBLIC_GET_ALL_PRODUCTS,{
    headers:{
        type:'product'
    }
  })
  const productData = await request.data

  return{
      props: { productData: productData }
  }
}