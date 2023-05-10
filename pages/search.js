import React from 'react';
import Search from '../Components/Layouts/Search';
import axios from 'axios';

const search = ({destination, city, date, tourData}) => {
  return (
    <Search destination={destination} city={city} date={date} tourData={tourData} />
  )
}
export default search

export async function getServerSideProps({req, res, query}){
  const { destination, city, date } = query;
  const tourData = await axios.get(process.env.NEXT_PUBLIC_GET_SEARCH_TOURS,{
    headers:{
      'destination':`${destination}`,
      'city':`${city}`,
      'date':`${date}`
    }
  }).then((x)=>x.data)
  return{
    props: { destination, city, date, tourData },
  }
}