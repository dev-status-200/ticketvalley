import React from 'react';
import Home from '/Components/Layouts/Home';
import axios from 'axios';

const index = ({bestSellingData, adventureData, comboData}) => {
  return (
    <Home bestSellingData={bestSellingData} adventureData={adventureData} comboData={comboData} />
  )
}
export default index

export async function getServerSideProps({req, res}){
  const bestSellingData = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ADV_CATEGORY,{
    headers:{ "category": "Best Selling" }
  }).then((x)=>x.data.result)
  const adventureData = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ADV_CATEGORY,{
    headers:{ "category": "Adventure Tours" }
  }).then((x)=>x.data.result)
  const comboData = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ADV_CATEGORY,{
    headers:{ "category": "Combo Tours" }
  }).then((x)=>x.data.result)

  return{
    props: { bestSellingData:bestSellingData, adventureData:adventureData, comboData:comboData },
}
}