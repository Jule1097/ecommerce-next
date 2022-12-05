import { useState, useEffect } from "react";
import Products from "../components/Products";
import Router from "next/router";
import { useRouter } from "next/router";

export default function Home(data) {
  const [islogged, setIsLogged] = useState(true);
  const [token, setToken] = useState("");
  const [rolePermissions, setRolePermissions] = useState([]);

  const router = useRouter();

  const roles = [
    {
      Role: "admin",
      Permissions: [
        {
          Models: "Products",
          Actions: ["GET", "POST", "PUT", "DELETE"],
        },
        {
          Models: "Orders",
          Actions: ["GET", "DELETE"],
        },
      ],
    },
    {
      Role: "user",
      Permissions: [
        {
          Models: "Products",
          Actions: ["GET"],
        },
      ],
    },
  ];

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);

    const getRole = localStorage.getItem("userRole");

    const permissionsByRole = roles.find((e) => e.Role === getRole).Permissions;
    setRolePermissions(permissionsByRole);
  }, []);

  console.log(rolePermissions);

  const logOut = () => {
    if (!islogged) {
      setIsLogged(false);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      Router.push("/login");
    }
  };

  return (
    <div className="page-content">
      <title>Mi Tienda</title>
      <div>
        <h1 className="page-content">Ecommerce APP</h1>
        <button onClick={() => router.push({ pathname: "/products" })}>
          Añadir Producto
        </button>
        <Products data={data} token={token} />
      </div>
      <div>
        <a href="/orders">Ver ordenes</a>
      </div>
      <div>
        <a href="/carrito">Ver carrito</a>
      </div>
      <div></div>
      <div>
        <button onClick={() => logOut()}>Cerrar Sesión</button>
      </div>
      <div></div>
    </div>
  );
}

const API_URL = "http://localhost:4000/api/products";

export async function getServerSideProps(context) {
  const res = await fetch(API_URL);
  const data = await res.json();

  return {
    props: {
      data,
      protected: true,
    },
  };
}
