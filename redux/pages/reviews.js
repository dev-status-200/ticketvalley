import React from 'react';
import Reviews from '../Components/Layouts/Reviews';
import axios from 'axios';

const reviews = ({reservationData}) => {
  return (
    <>
      <Reviews reservationData={reservationData} />
    </>
  )
}
export default reviews

export async function getServerSideProps({req, res, query}){
  const data = await axios.get(process.env.NEXT_PUBLIC_GET_ALL_RESERVATION_REVIEWS).then((x) => x.data);
  return{
    props: { reservationData:data },
  }
}