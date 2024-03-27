import React, { useEffect } from 'react';
import Header from './Header/';
import Footer from './FooterNew/';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cart/cartSlice';
import { retrieveCart } from '../../functions/cartFunction';
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const MainLayout = ({children}) => {

  const dispatch = useDispatch();

  useEffect(() => { dispatch(addProduct(retrieveCart())); }, [])

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

export default React.memo(MainLayout)
