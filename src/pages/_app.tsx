import '../styles/globals.css';

import { AppProps } from 'next/app';

function MyApp({ pageProps, Component }: AppProps) {
  console.log('MyApp');
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
