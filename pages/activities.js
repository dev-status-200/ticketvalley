import React from 'react';
import Activities from '../Components/Layouts/Activities';
import axios from 'axios';

const activities = ({activity}) => {
  return (
    <Activities activity={activity} />
  )
}

export default activities

export async function getServerSideProps({req, res, query}){
  const {id} = query;
  return{
    props: { activity:id },
  }
}