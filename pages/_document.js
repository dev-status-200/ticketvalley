import Document, { Html, Head, Main, NextScript } from 'next/document';

class MainDocument extends Document {
  render() {
    return (
    <Html>
      <title>Peaceland | Travel & Tours</title>
      <Head>
        <meta name="description" content="Lead Management System" />
        <link rel="icon" href="/images/logo.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" as="font" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin={true} />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Poppins:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />

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