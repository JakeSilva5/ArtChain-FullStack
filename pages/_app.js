import GlobalStyle from '@/styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import Navbar from '@/components/Dashboard/Navbar';
import Head from 'next/head';


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ArtChain</title>
        <meta name='description' content='Decentralized NFT Art Gallery' />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}