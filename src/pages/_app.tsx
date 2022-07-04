import '../styles/globals.css';

import { useMemo } from 'react';
import App, { AppContext, AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import initApolloClient from '../helpers/initApolloClient';

function MyApp({ pageProps: { apolloClient, apolloState, ...pageProps }, Component }: AppProps) {
  return (
    <ApolloProvider client={useMemo(() => apolloClient || initApolloClient(null, apolloState), [apolloClient, apolloState])}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;

  const initialProps = await App.getInitialProps(appContext);

  const apolloClient = initApolloClient(ctx);

  Object.assign(initialProps.pageProps, {
    apolloClient,
    apolloState: null,
  });

  // @ts-ignore
  if (ctx.req) ctx.req.pageProps = initialProps.pageProps;

  return initialProps;
};

export default MyApp;
