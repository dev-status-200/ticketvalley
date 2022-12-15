import React from 'react';
import axios from 'axios';
import Cookies from 'cookies';
import Dashboard from '../../Components/Layouts/Portal/Dashboard';

const portal = ({sessionData}) => {
  return (
    <div>
      <Dashboard sessionData={sessionData} />
    </div>
  )
}

export default portal

export async function getServerSideProps({req,res}){
  const cookies = new Cookies(req, res)
  const sessionRequest = await axios.get(process.env.NEXT_PUBLIC_LOGIN_VERIFICATION,{
    headers:{"x-access-token": `${cookies.get('token')}`}
  }).then((x)=>x.data);

  return{
      props: { sessionData:sessionRequest }
  }
}