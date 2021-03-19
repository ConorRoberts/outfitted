import { ApolloClient, InMemoryCache } from "@apollo/client";

// const URL = process.env.NODE_ENV==="development" ? "http://localhost:3000" : "https://outfitted.vercel.app";

const client = new ApolloClient({
  uri: `/api/graphql`,
  cache: new InMemoryCache(),
});

export default client;
