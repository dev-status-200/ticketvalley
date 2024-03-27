import React, { useState, useEffect } from 'react';
import { 
  MenuFoldOutlined, MenuUnfoldOutlined, CarOutlined, UserOutlined,
  TagsOutlined, SnippetsOutlined, CreditCardOutlined, UsergroupAddOutlined,
  StarOutlined, HomeOutlined, WechatOutlined, UnorderedListOutlined
} from '@ant-design/icons';
import { FaLocationCrosshairs } from "react-icons/fa6";
import axios from 'axios';
import Router from 'next/router';
import Cookies from 'js-cookie';
import moment from 'moment';
import { Layout, Menu, theme, Popover, Button, Badge } from 'antd';
const { Header, Sider, Content } = Layout;

const PortalLayout = ({children}) => {

  const counts = {
    visa:0,
    tour:0,
    message:0,
    hotel:0
  }
  const [count, setCount] = useState({...counts});
  const [list, setList] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_GET_NOTIFICATIONS)
    .then((x)=>{
      let tempCount = {...counts}
      x?.data?.result?.forEach((y) => {
        if(y.type=="message"){
          tempCount.message = tempCount.message + 1
        } else if(y.type=="visa"){
          tempCount.visa = tempCount.visa + 1
        } else if(y.type=="tour"){
          tempCount.tour = tempCount.tour + 1
        } else if(y.type=="hotel"){
          tempCount.hotel = tempCount.hotel + 1
        }
      });
      setCount(tempCount)
    })
    axios.get(process.env.NEXT_PUBLIC_GET_PAST_100)
    .then((x)=>{
      setList(x.data.result)
    })
  }, []);

  const content = (
    <div style={{maxHeight:200, overflowY:'auto'}}>
      {list?.map((x, i)=>{
        return(
        <div key={i} className='mb-3 fs-13 grey-txt-2'>{x.description} - {moment(x.createdAt).fromNow()} <span className='mx-1'></span>
          <hr className='my-0' />
        </div>
      )})}
    </div>
  );
  
  return (
  <Layout className='portal-layout'>
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{height:'6vh'}}>
        {!collapsed && <h5 className='m-4 wh-txt'>Welcome</h5> }
        {collapsed && <div style={{minHeight:72}}></div> }
      </div>
      <div style={{height:'90vh', overflowY:'auto', paddingBottom:30}}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={(x)=>{
            if(x.key=='1'){ Router.push('/portal')
            } else if(x.key=='2'){ Router.push('/productCreation')
            } else if(x.key=='3'){ Router.push('/transport')
            } else if(x.key=='4'){ Router.push('/promos')
            } else if(x.key=='5'){ Router.push('/bookings') 
            } else if(x.key=='6'){ Router.push('/inventory') 
            } else if(x.key=='7'){ Router.push('/customers') 
            } else if(x.key=='8'){ Router.push('/reviews') 
            } else if(x.key=='9'){ Router.push('/hotelForms') 
            } else if(x.key=='10'){ Router.push('/contactForms') 
            } else if(x.key=='11'){ Router.push('/destinationPage') 
            } else if(x.key=='12'){ Router.push('/visaForms') 
            } else if(x.key=='13'){ Router.push('/packageCreation') 
            } else if(x.key=='14'){ Router.push('/packageQueries') 
            }
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
              key: '13',
              icon: <SnippetsOutlined />,
              label: 'Packages',
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
              label: <Badge count={count.tour}><span className='silver-txt' style={{paddingRight:10}}>Bookings</span></Badge>,
            },
            {
              key: '6',
              icon: <TagsOutlined />,
              label: "Inventory"
            },
            {
              key: '7',
              icon: <UsergroupAddOutlined />,
              label: 'Customers',
            },
            {
              key: '11',
              icon: <FaLocationCrosshairs />,
              label: 'Destinations',
            },
            {
              key: '8',
              icon: <StarOutlined />,
              label: 'Reviews',
            },
            {
              key: '9',
              icon: <HomeOutlined />,
              label: <Badge count={count.hotel}><span className='silver-txt' style={{paddingRight:10}}>Hotel Queries</span></Badge>,
            },
            {
              key: '12',
              icon: <CreditCardOutlined />,
              label: <Badge count={count.visa}><span className='silver-txt' style={{paddingRight:10}}>Visa Queries</span></Badge>,
            },
            {
              key: '14',
              icon: <UnorderedListOutlined />,
              label: <Badge count={count.visa}><span className='silver-txt' style={{paddingRight:10}}>Package Queries</span></Badge>,
            },
            {
              key: '10',
              icon: <WechatOutlined />,
              label: <Badge count={count.message}><span className='silver-txt' style={{paddingRight:10}}>Messages</span></Badge>,
            },
          ]}
        />
      </div>
    </Sider>
    <Layout className="site-layout">
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <span style={{marginLeft:12, cursor:'pointer'}} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          <span className='mx-3'></span>
        </span>
        
        <span className='mx-4' style={{float:'right', cursor:'pointer'}}
          onClick={()=>{
            Cookies.remove('token');
            Cookies.remove('username');
            Cookies.remove('loginId');
            Router.push('/portal');
          }}
        >Logout</span>
        <Popover placement="topLeft" title={"Activity Log"} content={content}>
          <Button className='mt-3'  style={{float:'right'}}>Logs</Button>
        </Popover>
        
      </Header>
      <Content style={{ margin: '24px 16px', padding: 24, minHeight: "70%", background: colorBgContainer }}>
        {children}
      </Content>
    </Layout>
  </Layout>
  );
};
export default React.memo(PortalLayout);