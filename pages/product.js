import React from 'react';
import Product from '../Components/Layouts/Product';
import { useRouter } from 'next/router';
import axios from 'axios';

const product = ({id, tourData}) => {
  const router = useRouter();
  return (
    <div><Product id={id} tourData={tourData} /></div>
  )

}
export default product

export async function getServerSideProps({req, res, query}){
  const {id} = query;
  const tourData = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ID,{
    headers:{ "id": `${id}` }
  }).then((x)=>x.data.result)

  return{
    props: { id:id, tourData:tourData },
}
}