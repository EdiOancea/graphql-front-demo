import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { toIdValue } from 'apollo-utilities';

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      hotel: (_, { id }) => toIdValue(cache.config.dataIdFromObject({ __typename: 'HotelType', id })),
    },
  },
});

const request = operation => {
  const token = localStorage.getItem('token');

  operation.setContext({
    headers: {
      authorization: token ? `JWT ${token}` : '',
    },
  });
};

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;

    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) {
        handle.unsubscribe()
      };
    };
  })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          )
        });
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    requestLink,
    new HttpLink({
      uri: 'http://localhost:8000/graphql/',
    })
  ]),
  cache,
  resolvers: {},
});

export default client;
