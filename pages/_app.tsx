import { AppProps } from 'next/app';
import Head from 'next/head';
import { Container, MantineProvider } from '@mantine/core';
import { MetaMaskProvider } from '@/context/metamaskContext';
import Header from '@/components/header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MetaMaskProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
          }}
        >
          <Container size="sm">
            <Header/>
            <Component {...pageProps} />
          </Container>
        </MantineProvider>
      </MetaMaskProvider>
    </>
  );
}
