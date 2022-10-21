import "../styles/globals.css";
import { TokenContext } from "../components/token";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

function MyApp({ Component, pageProps }) {

  const [token, setToken] = useState(null);
  
  useEffect(() => {

    const getToken = localStorage.getItem("token");

    if (getToken) {
      setToken(getToken);
      } else if (!token) {
      Router.push("/login")
    }  
  }, []);

  if (pageProps.protected && !token) {
    return <Layout>Loading ...</Layout>;
  }

  return (
    <TokenContext.Provider value={token}>
      <Component {...pageProps} />
    </TokenContext.Provider>
  );
}

export default MyApp;
