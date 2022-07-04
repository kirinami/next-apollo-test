import { NextPageContext } from 'next';
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const isServer = typeof window === 'undefined';

let apolloClientMemo: ApolloClient<NormalizedCacheObject> | undefined;

function createHttpLink() {
  return new HttpLink({
    uri: 'https://playground.kirinami.com/graphql',
    credentials: 'same-origin',
    headers: {
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY1Njk0NTk1NiwiZXhwIjoxNjU3NTUwNzU2fQ.PUNbuXqFxSuVL8dugY5862kbrPHK2bGOD0H0TgkD2zU',
    },
  });
}

export function createApolloClient(initialState?: NormalizedCacheObject) {
  const apolloClient = new ApolloClient({
    ssrMode: isServer,
    ssrForceFetchDelay: isServer ? 100 : undefined,
    link: createHttpLink(),
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
  });

  // @ts-ignore
  apolloClient.toJSON = () => undefined;

  return apolloClient;
}

export default function initApolloClient(ctx?: NextPageContext | null, initialState?: NormalizedCacheObject) {
  const apolloClient = apolloClientMemo ?? createApolloClient();

  if (initialState) {
    const existingCache = apolloClient.extract();

    apolloClient.restore({
      ...existingCache,
      ...initialState,
      ROOT_QUERY: {
        ...(existingCache.ROOT_QUERY || {}),
        ...(initialState.ROOT_QUERY || {}),
      },
    });
  }

  if (isServer) {
    return apolloClient;
  }

  if (!apolloClientMemo) {
    apolloClientMemo = apolloClient;
  }

  return apolloClient;
}
