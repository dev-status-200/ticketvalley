import React, { useState } from 'react';
import { 
  MenuFoldOutlined, MenuUnfoldOutlined, CarOutlined, UserOutlined,
  TagsOutlined, SnippetsOutlined, CreditCardOutlined, UsergroupAddOutlined,
  StarOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import Router from 'next/router';
import Cookies from 'js-cookie';

const PortalLayout = ({children}) => {

  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <Layout className='portal-layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        {!collapsed && <h5 className='m-4 wh-txt'>Welcome</h5> }
        {collapsed && <div style={{minHeight:72}}></div> }
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onSelect={(x)=>{
            if(x.key=='1'){ Router.push('/portal')
            } else if(x.key=='2'){ Router.push('/productCreation')
            } else if(x.key=='3'){ Router.push('/transport')
            } else if(x.key=='4'){ Router.push('/promos')
            } else if(x.key=='5'){ Router.push('/bookings') 
            } else if(x.key=='6'){ Router.push('/inventory') 
            } else if(x.key=='7'){ Router.push('/customers') 
            } else if(x.key=='8'){ Router.push('/reviews') }
          }}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <SnippetsOutlined />,
              label: 'Product',
            },
            {
              key: '3',
              icon: <CarOutlined />,
              label: 'Transport',
            },
            {
              key: '4',
              icon: <TagsOutlined />,
              label: 'Promos',
            },
            {
              key: '5',
              icon: <CreditCardOutlined />,
              label: 'Bookings',
            },
            {
              key: '6',
              icon: <TagsOutlined />,
              label: 'Inventory',
            },
            {
              key: '7',
              icon: <UsergroupAddOutlined />,
              label: 'Customers',
            },
            {
              key: '8',
              icon: <StarOutlined />,
              label: 'Reviews',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <span style={{marginLeft:12, cursor:'pointer'}} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          </span>
          <span className='mx-4' style={{float:'right', cursor:'pointer'}}
            onClick={()=>{
                Cookies.remove('token');
                Cookies.remove('username');
                Cookies.remove('loginId');
                Router.push('/portal');
            }}
          >Logout</span>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: "70%", background: colorBgContainer }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default React.memo(PortalLayout);