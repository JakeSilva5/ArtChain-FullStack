import GlobalStyle from '@/styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import Navbar from '@/components/Dashboard/Navbar';
import Head from 'next/head';
import { ThirdwebProvider, metamaskWallet } from '@thirdweb-dev/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ArtChain</title>
        <meta name='description' content='Decentralized NFT Art Gallery' />
      </Head>

      <ThirdwebProvider
        clientId="aaebf29680e6716ea93c4cd4333016cd"
        activeChain="binance-testnet"
        supportedWallets={[metamaskWallet()]}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Navbar />
          <Component {...pageProps} />
        </ThemeProvider>
      </ThirdwebProvider>
    </>
  );
}