import React from 'react';
import Product from '../Components/Layouts/Product';
import { useRouter } from 'next/router';

const product = () => {
  const router = useRouter();
  const {id} = router.query;
  return (
    <div><Product query={router.query} /></div>
  )
}

export default product