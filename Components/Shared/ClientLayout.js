import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Layout } from 'antd';

const MainLayout = ({children}) => {
  return (
    <>
      <Layout>
      <Header/>
        {children}
      <Footer/>
      </Layout>
    </>
  )
}

export default MainLayout
