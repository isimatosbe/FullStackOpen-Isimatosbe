import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';

console.log("Prueba", Constants.manifest.extra)

const httpLink = createHttpLink({
    // Replace the IP address part with your own IP address!
    uri: Constants.manifest.extra.apolloURI,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;