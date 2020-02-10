export const isAuthError = error => (
  error &&
  error.graphQLErrors &&
  error.graphQLErrors.find(err => err.message === 'Not logged in')
);
