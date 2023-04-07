import React from 'react';

import { useRouter } from 'next/router';
import Product from '../../Components/Layouts/Product';
import axios from "axios";

const product = ({id, tourData, transportData}) => {
  const router = useRouter();
  return (
    <Product id={id} tourData={tourData} transportData={transportData} />
  )

}
export default product

export async function getStaticProps(context) {
    const { params } = context

      const tourData = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ID,{
        headers:{ "id": `${params.id}` }
      }).then((x)=>x.data.result)

      const transportData = await axios.get(process.env.NEXT_PUBLIC_GET_TRANSPORT).then((x)=>x.data.result)
  
    if (!tourData.id) {
      return {
        hasError: true
      }
    }
    return {
      props: {
        tourData: tourData, id:params.id, transportData:transportData
      }
    }
  }
  
  export async function getStaticPaths() {
    const response = await fetch(process.env.NEXT_PUBLIC_GET_PRODUCT_IDS)
    const data = await response.json();
    const paths = data.result.map(x => {
      return {
        params: { id: `${x.id}` }
      }
    })
  
    return {
      paths,
      fallback: true
    }
  }