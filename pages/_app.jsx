//Import
import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../config/theme";
import Loader from "react-spinners/BounceLoader";

//import-Components
import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardHolder from "../components/CardHolder";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <>
 
      {
        loading ?
        <>
          {/* LOADING SCREEN */} 
          <div style={{width: "100vw", height: "100vh" ,display: "flex", justifyContent: "center", alignItems: "center", background: "#457B9D"}}>
          <Loader
          color="#F7B359"
          loading={loading}
          size="150px"
          speedMultiplier="1.5"
          />
          </div>
        </>
        :
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
      }
    </>
  );
}

export default MyApp;
