import React from 'react';
import Transport from '../Components/Layouts/Transport/';
import axios from 'axios';

const transport = ({transportData}) => {
  return (
    <Transport transportData={transportData} />
  )
}

export default transport

export async function getServerSideProps({req, res, query}){
  // const {id} = query;
  const data = await axios.get(process.env.NEXT_PUBLIC_GET_TRANSPORT).then((x) => x.data);
  return{
    props: { transportData:data },
  }
}