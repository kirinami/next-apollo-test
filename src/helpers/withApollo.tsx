import { withApollo } from 'next-with-apollo';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';

const isServer = typeof window === 'undefined';

export default withApollo(
  ({ initialState }) => new ApolloClient({
    ssrMode: isServer,
    ssrForceFetchDelay: isServer ? 100 : undefined,
    link: new HttpLink({
      uri: 'https://playground.kirinami.com/graphql',
      credentials: 'same-origin',
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY1Njk0NTk1NiwiZXhwIjoxNjU3NTUwNzU2fQ.PUNbuXqFxSuVL8dugY5862kbrPHK2bGOD0H0TgkD2zU',
      },
    }),
    cache: new InMemoryCache().restore(initialState || {}),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
      },
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
      },
      mutate: {
        errorPolicy: 'all',
        fetchPolicy: 'network-only',
      },
    },
  }),
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
    getDataFromTree,
  },
);
