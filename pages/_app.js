import React,{ useState, useEffect } from 'react';
import '/styles/globals.css';
import '/styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';

import Loader from '../Components/Shared/Loader'; 

import Router, { useRouter  } from 'next/router';

import ClientLayout from '../Components/Shared/ClientLayout';
import PortalLayout from '../Components/Shared/PortalLayout';
import { SessionProvider } from "next-auth/react";

import { store } from '/redux/store';
import { Provider } from 'react-redux';
import Script from "next/script";

function MyApp({ Component, pageProps:{ session, ...pageProps }, }) {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  Router.events.on("routeChangeStart", () => { setLoading(true) });
  Router.events.on("routeChangeComplete", () => { setLoading(false)});

  useEffect(() => {
    if(router.pathname=='/_error'){
      Router.push("/")
    }
  }, []);

  return (
  <>  
  <Script strategy="beforeInteractive" src={`https://www.googletagmanager.com/gtag/js?id=AW-16534859566`} />
      <Script strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16534859566', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
    {(
      router.pathname =='/'            ||
      router.pathname =='/product'     ||
      router.pathname =='/product/[id]'||
      router.pathname =='/cart'        ||
      router.pathname =='/myBookings'  ||
      router.pathname =='/about'       ||
      router.pathname =='/ticketPage'  ||
      router.pathname =='/search'      ||
      router.pathname =='/destinations'||
      router.pathname =='/contact'     ||
      router.pathname =='/paySuccess'
    ) &&
    <>
      { loading && 
        <SessionProvider session={session}>
          <Provider store={store}>
            <Loader/> 
          </Provider>
        </SessionProvider>
      }
      { !loading &&
        <SessionProvider session={session}>
          <Provider store={store}>
            <ClientLayout>
              <Component {...pageProps} /> 
            </ClientLayout>
          </Provider>
        </SessionProvider>
      }
    </>
    }
    {(
      router.pathname =='/portal'         ||
      router.pathname =='/productCreation'||
      router.pathname =='/transport'      ||
      router.pathname =='/bookings'       ||
      router.pathname =='/inventory'      ||
      router.pathname =='/customers'      ||
      router.pathname =='/tourEditPage'   ||
      router.pathname =='/packageEditPage'||
      router.pathname =='/reviews'        ||
      router.pathname =='/contactForms'   ||
      router.pathname =='/hotelForms'     ||
      router.pathname =='/visaForms'      ||
      router.pathname =='/destinationPage'||
      router.pathname =='/packageCreation'||
      router.pathname =='/packageQueries' ||
      router.pathname =='/promos' 
    ) &&
      <PortalLayout>
        { loading && <Loader/> }
        { !loading && <Component {...pageProps} /> }
      </PortalLayout>
    }
    {(router.pathname =='/login' || router.pathname =='/auth/signin') &&
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    }
  </>
  )
}

export default MyApp
