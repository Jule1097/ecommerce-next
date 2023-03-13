import React from "react";
import Orders from "/components/Orders";


const orders = (columns) => {
  return (
    <Orders
      columns={[
        { id: 1, field: "items[0].name", headerName: "Producto" },
        { id: 2, field: "items[0].price", headerName: "Precio Unitario" },
        { id: 3, field: "items[0].quantity", headerName: "Cantidad"},
        { id: 4, field: "subtotal", headerName: "Sub Total" },
        { id: 5, field: "taxes", headerName: "Impuestos"},
        { id: 6, field: "total", headerName: "Precio Total"},
        { id: 7, field: "date", headerName: "Fecha de compra"}
      ]}
    ></Orders>
  );
};

export default orders;
