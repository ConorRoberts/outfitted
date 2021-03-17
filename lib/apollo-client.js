import { ApolloClient, InMemoryCache } from "@apollo/client";

const URL = process.env.NODE_ENV==="development" ? "http://localhost:3000" : "http://outfitted.vercel.app";

const client = new ApolloClient({
  uri: `${URL}/api/graphql`,
  cache: new InMemoryCache(),
});

export default client;
