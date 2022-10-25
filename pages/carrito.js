import React, { useState, useEffect } from "react";
import Carrito from "../components/Carrito";

const carrito = (columns) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("carrito"));
      setProducts(items)
    } catch (err) {
      // 👇️ SyntaxError: Unexpected end of JSON input
      console.log("error", err);
    }
  }, []);

  if (products.length === 0) {
    return (
      <div>
        <h1 className="page-content">Mi Carrito</h1>
        <a href="/">Volver</a>
        <h2>Carrito Vacio</h2>
      </div>
    )
  } else {
    return (
      <div>
        <h1 className="page-content">Mi Carrito</h1>
        <a href="/">Volver</a>
        <Carrito
          columns={[
            { id: 1, field: "quantity", headerName: "Cantidad" },
            { id: 2, field: "name", headerName: "Producto" },
            { id: 3, field: "price", headerName: "Precio Unitario" },
          ]}
        ></Carrito>
      </div>
    );
  }
};

export default carrito;
