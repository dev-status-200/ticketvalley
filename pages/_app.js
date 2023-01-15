import React,{ useState } from 'react';
import '/styles/globals.css';
import '/styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '/Components/Shared/Header';
import 'aos/dist/aos.css';

//import { wrapper } from '../redux/store';
import Loader from '../Components/Shared/Loader'; 

import Router, { useRouter  } from 'next/router';

import ClientLayout from '../Components/Shared/ClientLayout';
import PortalLayout from '../Components/Shared/PortalLayout';
import {SessionProvider} from "next-auth/react";

function MyApp({ Component, pageProps:{ session, ...pageProps }, }) {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  Router.events.on("routeChangeStart", () => { setLoading(true) });
  Router.events.on("routeChangeComplete", () => { setLoading(false)});

  return (
    <> 
    { (router.pathname =='/' || router.pathname =='/product' ) && 
        <>
        { loading && <Loader/> }
        { !loading &&
        <SessionProvider session={session}>
          <ClientLayout>
           <Component {...pageProps} /> 
          </ClientLayout>
        </SessionProvider>
        }
        </>
    }
    { (router.pathname =='/portal' || router.pathname =='/productCreation'|| router.pathname =='/transport') &&
      <PortalLayout>
        { loading && <Loader/> }
        { !loading && <Component {...pageProps} /> }
      </PortalLayout>
    }
    { (router.pathname =='/login' || router.pathname =='/auth/signin') &&
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    }
    </>
  )
}

export default MyApp