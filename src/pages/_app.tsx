import '../styles/globals.css';

import { AppProps } from 'next/app';

function MyApp({ pageProps, Component }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
