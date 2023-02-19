import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cart/cartSlice';
import { retrieveCart } from '../../functions/cartFunction';

const MainLayout = ({children}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addProduct(retrieveCart()));
  }, [])

  return (
    <>
      <Layout style={{fontFamily:'Alata'}}>
      <Header/>
        {children}
      <Footer/>
      </Layout>
    </>
  )
}

export default MainLayout
