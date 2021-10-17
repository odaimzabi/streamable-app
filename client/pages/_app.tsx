

import { CSSReset, ThemeProvider } from "@chakra-ui/core";

import theme from "../theme";
import messagesContext from '../context/messages'
import { useState } from "react";
function MyApp({ Component, pageProps }: any) {

  const [messages,setMsg]=useState<string[]>([])
  const context={
    messages:messages,
    setMsg:(data:any)=>{}
  }
  return (
    
    <messagesContext.Provider value={{messages,setMsg}}>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
    </messagesContext.Provider>
  );
}

export default MyApp;