import "../styles/globals.css";
import { TokenContext } from "../components/token";
import { useEffect } from "react";
import useUser from "../hooks/useUser";


function MyApp({ Component, pageProps }) {

 const {checkToken, token } = useUser()

  useEffect(() => {
    checkToken()
  }, [])
  
  return (
    <TokenContext.Provider value={token}>
      <Component {...pageProps} />
    </TokenContext.Provider>
  );
}

export default MyApp;
