import { useState } from "react";
import Products from "../components/Products";
import Router from "next/router";
import NewProduct from "../components/NewProduct";


export default function Home(data) {
  const [islogged, setIsLogged] = useState(true);

  const logOut = () => {
    if (!islogged) {
      setIsLogged(false);
    } else {
      localStorage.removeItem("token");
      Router.push("/login");
    }
  };

 

  return (
    <div className="page-content">
      <title>Mi Tienda</title>
      <div>
        <h1 className="page-content">Ecommerce APP</h1>
        <button>Probando</button>
        {/* <NewProduct></NewProduct> */}
        <Products data={data} />
      </div>
      <div>
        <a href="/orders">Ver ordenes</a>
      </div>
      <div>
        <a href="/carrito">Ver carrito</a>
      </div>
      <div>
        
      </div>
      <div>
        <button onClick={() => logOut()}>Cerrar Sesión</button>
      </div>
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
