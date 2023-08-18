import React, { useEffect } from 'react';
import Header from './Header/';
import Footer from './Footer/';
import { Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cart/cartSlice';
import { retrieveCart } from '../../functions/cartFunction';
import { WhatsAppOutlined } from '@ant-design/icons';
import { Popover } from 'antd'
const MainLayout = ({children}) => {

  const dispatch = useDispatch();

  useEffect(() => { dispatch(addProduct(retrieveCart())); }, [])

  return (
    <>
      <Layout style={{fontFamily:'Alata'}}>
      <Header/>
        {children}
      <Footer/>
      <Popover content={(
        <div>
          <p>Have A Question?</p>
        </div>
      )}>
      <a href="https://wa.me/971559986370" target="_blank"
        style={{
          backgroundColor:"green",
          width:50,
          height:50,
          textAlign:'center',
          justifyContent:'center',
          display:'flex',
          flex:1,
          alignItems:'center',
          borderRadius:"100%",
          position:'fixed',
          bottom:23,
          right:"5%",
          boxShadow: "10px 10px 14px -6px rgba(0,1,0,0.35)",
          WebkitBoxShadow:"10px 10px 14px -6px rgba(0,1,0,0.35)",
          MozBoxShadow:"10px 10px 14px -6px rgba(0,0,1,0.35)"
        }}
      ><WhatsAppOutlined style={{color:'white', fontSize:20}} />
      </a>
      </Popover>
      </Layout>
    </>
  )
}

export default React.memo(MainLayout)
