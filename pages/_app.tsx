import '../styles/globals.scss'
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import client from "../lib/apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider session={pageProps.session}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </ApolloProvider>
  )
}

export default MyApp
