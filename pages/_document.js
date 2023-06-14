import Document, { Html, Head, Main, NextScript } from 'next/document';

class MainDocument extends Document {
  render() {
    return (
    <Html>
      {/* <title>Tickets Valley | Travel & Tours</title> */}
      <Head >
        {/* <meta name="description" content="Tickets Valley" />
        <link rel="icon" href="/images/toplogo.png" width={200} /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" as="font" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
        
        
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    )
  }
}
export default MainDocument