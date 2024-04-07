import React, { useEffect } from 'react';
import Header from './Header/';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import { addProduct } from '/redux/cart/cartSlice';
import { retrieveCart } from '/functions/cartFunction';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./Footer'), { ssr: false });

const MainLayout = ({children}) => {

  const dispatch = useDispatch();
  useEffect(() => { dispatch(addProduct(retrieveCart())); }, []);

  return (
    <Layout style={{fontFamily:'Alata'}}>
      <Header/>
        {children}
      <Footer/>
      <FloatingWhatsApp
        phoneNumber="971503374890"
        accountName="Ticketsvalley"
        allowEsc
        avatar={'/images/whatsappicon.png'}
        allowClickAway
        notification
        notificationSound
      />
    </Layout>
  )
}

export default React.memo(MainLayout);