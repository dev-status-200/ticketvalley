import React from 'react';
import Bookings from '../Components/Layouts/Bookings';
import axios from 'axios';

const bookings = ({bookingsData}) => {
  return (
    <Bookings bookingsData={bookingsData} />
  )
}
export default bookings

export async function getServerSideProps({req, res, query}){

  const bookingsData = await axios.get(process.env.NEXT_PUBLIC_CREATE_GET_ALL_RESERVATIONS)
  .then((x)=>x.data)
  return{
    props: { bookingsData },
  }
}