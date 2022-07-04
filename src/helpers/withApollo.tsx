import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';

import { createApolloClient } from './initApolloClient';

export default withApollo(({ initialState }) => createApolloClient(initialState), {
  render: ({ Page, props }) => {
    return (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    );
  },
  getDataFromTree,
});
