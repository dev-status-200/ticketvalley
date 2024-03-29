import React from 'react';
import Customers from '/Components/Layouts/Customers';
import axios from 'axios';

const customers = ({data, promoData}) => {
  return <Customers data={data} promoData={promoData} />
}
export default customers

export async function getServerSideProps({req,res}){
    const data = await axios.get(process.env.NEXT_PUBLIC_GET_ALL_CUSTOMERS,{
    }).then((x)=>x.data);
    
    const promoData = await axios.get(process.env.NEXT_PUBLIC_GET_PROMOS,{
    }).then((x)=>x.data);
  
    return{
        props: { data:data, promoData }
    }
  }