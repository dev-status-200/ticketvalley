import React from 'react';
import Product from '../../Components/Layouts/Product';
import axios from "axios";

const product = ({id, tourData}) => {
  return (
    <Product 
      tourData={tourData} 
      id={id} 
      //transportData={transportData} 
    />
  )

}
export default product

export async function getStaticProps(context) {
    const { params } = context;
    const tourData = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ID,{
      headers:{ "id": `${params.id}` }
    }).then((x)=>x.data.result)
  
    if (!tourData.id) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        id:params.id,
        tourData: tourData //, transportData:transportData
      },
      revalidate: 20,
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