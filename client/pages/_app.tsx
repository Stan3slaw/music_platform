import type { AppProps } from 'next/app';
import Head from 'next/head';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import '../styles/global.scss';
import theme from '../styles/theme';

import { wrapper } from '../redux/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RMusic</title>
        <meta name='description' content='RMusic' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap'
          rel='stylesheet'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(App);
