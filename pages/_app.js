import GlobalStyle from '@/styles/globalStyles';
import Navbar from '@/components/Dashboard/Navbar';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ArtChain</title>
        <meta name='description' content='Decentralized NFT Art Gallery' />
      </Head>

      <GlobalStyle />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
