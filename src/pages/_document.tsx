import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  // Static site generation (SSG) is a feature of Next.js. Its improves SEO and performance by allowing you to pre-render pages at build time.
  render() {
    return (
      <Html lang="en">
        <title>Structize</title>
        <Head>
          <link rel="icon" type="image/ico" href="/favicon.ico" />
          <meta
            property="description"
            content="Structize - Best way to learn languages"
          />
          <meta
            property="og:description"
            content="Structize - Best way to learn languages"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          {/*<meta name="image" content="" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:description" content="" />
            <meta name="twitter:image" content="" />
            <meta name="pingdom" content="DI0Mzkza3IzbW1tbW1lZmtbdmx2Ozs7Oz" />
            <meta name="robots" content="noindex,follow" />
            <script id="stripe-js" src="https://js.stripe.com/v3/" async />*/}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
