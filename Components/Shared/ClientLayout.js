import React from 'react';
import Header from './Header';
import { Layout } from 'antd';

const MainLayout = ({children}) => {
  return (
    <>
      <Layout>
      <Header/>
        {children}
      </Layout>
    </>
  )
}

export default MainLayout
