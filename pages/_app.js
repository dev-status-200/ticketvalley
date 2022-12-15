import React,{ useState } from 'react';
import '/styles/globals.css';
import '/styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '/Components/Shared/Header';
import 'aos/dist/aos.css';

//import { wrapper } from '../redux/store';
import Loader from '../Components/shared/Loader'; 

import Router, { useRouter  } from 'next/router';

import ClientLayout from '../Components/Shared/ClientLayout';
import PortalLayout from '../Components/Shared/PortalLayout';

function MyApp({ Component, pageProps:{ session, ...pageProps }, }) {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  Router.events.on("routeChangeStart", () => { setLoading(true) });
  Router.events.on("routeChangeComplete", () => { setLoading(false)});

  return (
    <> 
    { (router.pathname !='/portal' && router.pathname !='/login') && 
      <ClientLayout>
          { loading && <Loader/> }
          { !loading && <Component {...pageProps} /> }
      </ClientLayout>
    }
    { router.pathname =='/portal' &&
      <PortalLayout>
        { loading && <Loader/> }
        { !loading && <Component {...pageProps} /> }
      </PortalLayout>
    }
    { router.pathname =='/login' &&
        <Component {...pageProps} />
      }
    </>
)
}

export default MyApp
