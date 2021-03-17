import { ApolloClient, InMemoryCache } from "@apollo/client";

const URL = process.env.NODE_ENV==="development" ? "http://localhost:3000" : "other";

const client = new ApolloClient({
  uri: `${URL}/api/graphql`,
  cache: new InMemoryCache(),
});

export default client;
