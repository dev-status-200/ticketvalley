import React, { useState, useEffect } from 'react';
import Router from 'next/router';

const Dashboard = ({sessionData}) => {

    useEffect(() => {
      if(sessionData.isLoggedIn==true){
        //Router.push('/login')
      }else{
        Router.push('/login')
      }
    }, [sessionData]);

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard