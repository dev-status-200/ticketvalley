import React from 'react';
import Inventory from '../Components/Layouts/Inventory';
import axios from 'axios';

const inventory = ({inventoryData}) => {
  return (
    <Inventory inventoryData={inventoryData} />
  )
}

export default inventory

export async function getServerSideProps({req,res}){
  const inventoryData = await axios.get(process.env.NEXT_PUBLIC_GET_INVENTORY_STATUS,{
    
  }).then((x)=>x.data);

  return{
      props: { inventoryData:inventoryData }
  }
}