//Import
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../config/theme";

//import-Components
import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardHolder from "../components/CardHolder";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <ChakraProvider theme={theme}>
      <Header/>
      <Hero>
        <Component {...pageProps} />
      </Hero>
      <CardHolder/>
      <Footer/>
    </ChakraProvider>
    </>
  );
}

export default MyApp;
