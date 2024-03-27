import React from 'react';
import axios from 'axios';
import TourEditPage from "../Components/Layouts/TourCreation/CreateOrEdit"

const tourEditPage = ({productData, id}) => {
  return (
    <TourEditPage productData={productData} id={id} packageType={true} />
  )
}
export default tourEditPage

export async function getServerSideProps({req, res, query}) {
  //const cookies = new Cookies(req, res);
  const request = await axios.get(process.env.NEXT_PUBLIC_GET_TOUR_FOR_EDIT,{
    headers:{
      id:query.id
    }
  })
  const productData = await request.data

  return{
    props: { productData: productData, id:query.id }
  }
}