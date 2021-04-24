import "../styles/globals.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import GlobalStyles from "../globalStyles";
import theme from "../theme";
import Footer from "@components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <GlobalStyles />
          <Component {...pageProps} />
          <Footer/>
        </ChakraProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
