import "../styles/globals.css";
import { TokenContext } from "../components/token";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import AuthRoles from "../components/AuthRoles";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);

    if (getToken) {
      setToken(getToken);
    } else if (!token) {
      router.push({ pathname: "/login" });
    }
  }, []);


  if (router.pathname === "/orders" && role === "user") {
    return <AuthRoles></AuthRoles>;
  }

  if (router.pathname === "/products" && role === "user") {
    return <AuthRoles></AuthRoles>;
  }

  if (router.pathname === "/products/[id]" && role === "user") {
    return <AuthRoles></AuthRoles>;
  }

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
