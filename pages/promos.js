import React from 'react';
import Promo from '../Components/Layouts/Promo/';
import axios from 'axios';

const promos = ({promoData}) => {
  return (
    <Promo promoData={promoData} />
  )
}

export default promos

export async function getServerSideProps({req, res, query}){
  // const {id} = query;
  const data = await axios.get(process.env.NEXT_PUBLIC_GET_ALL_PROMO,{headers:{type:'active'}}).then((x) => x.data);
  return{
    props: { promoData:data },
  }
}