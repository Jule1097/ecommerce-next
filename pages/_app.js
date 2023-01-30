import "../styles/globals.css";
import { TokenContext } from "../components/token";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = localStorage.getItem("token");

    if (getToken) {
      setToken(getToken);
    } else if (!token) {
      router.push({ pathname: "/login" });
    }
  }, []);

  return (
    <TokenContext.Provider value={token}>
      <Component {...pageProps} />
    </TokenContext.Provider>
  );
}

export default MyApp;
