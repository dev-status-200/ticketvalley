import Document, { Html, Head, Main, NextScript } from 'next/document';

class MainDocument extends Document {
  render() {
    return (
    <Html>
      <title>Tickets Valley | Travel & Tours</title>
      <Head >
        <meta name="description" content="Tickets Valley" />
        <link rel="icon" href="/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" as="font" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link href="https://fonts.googleapis.com/css2?family=Alata&display=swap" rel="stylesheet"></link>
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