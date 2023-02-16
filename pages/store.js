import { useState, useEffect } from "react";
import Products from "../components/Products";
import { useRouter } from "next/router";
import havePermissions from "../helpers/havePermissions";
import useUser from "../hooks/useUser";


export default function Home(data) {

  const {logOut, token} = useUser()
  
  const router = useRouter();

  if(havePermissions(router.pathname)) {
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
  } else {
    return (
      <div className="page-content">
        <title>Mi Tienda</title>
        <div>
          <h1 className="page-content">Ecommerce APP</h1>
          <Products data={data} token={token} />
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
