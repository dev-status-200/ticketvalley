import React from 'react';
import axios from 'axios';
import Cookies from 'cookies';
import Dashboard from '../../Components/Layouts/Portal/Dashboard';

const portal = ({sessionData, insights}) => {
  return (
    <div>
      <Dashboard sessionData={sessionData} insights={insights} />
    </div>
  )
}

export default portal

export async function getServerSideProps({req,res}){
  const cookies = new Cookies(req, res)
  const sessionRequest = await axios.get(process.env.NEXT_PUBLIC_LOGIN_VERIFICATION,{
    headers:{"x-access-token": `${cookies.get('token')}`}
  }).then((x)=>x.data);

  const insights = await axios.get(process.env.NEXT_PUBLIC_GET_INSIGHTS,{
    headers:{"x-access-token": `${cookies.get('token')}`}
  }).then((x)=>x.data);

  return{
      props: { sessionData:sessionRequest, insights:insights }
  }
}