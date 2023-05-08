import React, { useEffect } from 'react';
import Search from '../Components/Layouts/Search';

const search = ({destination, city}) => {
    
  return (
    <Search destination={destination} city={city} />
  )
}

export default search

export async function getServerSideProps({req, res, query}){
    const { destination, city } = query;
    return{
      props: { destination, city },
    }
  }