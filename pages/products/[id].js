import EditProduct from "/components/EditProduct";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const products = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
  }, []);

  const router = useRouter();
  const { id } = router.query;

  return <EditProduct id={id} token={token}></EditProduct>;
};

export default products;
