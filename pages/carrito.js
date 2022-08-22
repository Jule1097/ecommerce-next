import React, { useState, useEffect } from "react";
import Carrito from "../components/Carrito";

const carrito = (columns) => {
  return (
    <div>
      <Carrito
        columns= {[
          { id: 1, field: "quantity", headerName: "Cantidad" },
          { id: 2, field: "name", headerName: "Producto" },
          { id: 3, field: "price", headerName: "Precio" },
        ]}
      ></Carrito>
    </div>
  );
};

export default carrito;
