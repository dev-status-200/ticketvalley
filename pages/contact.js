import Contact from '/Components/Layouts/Contact';
import Head from 'next/head';

const contact = () => {
  return (
    <>
      <Head>
        <title>Contact Us | Reach Out Today for Exceptional Travel Assistance</title>
        <meta name='description' content='Contact us for personalized assistance & explore the world hassle-free. Contact us and connect with our expert team for unparalleled travel services.' key="desc" />
      </Head>
      <Contact />
    </>
  )
}

export default contact
