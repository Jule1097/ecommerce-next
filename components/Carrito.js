import { useState, useEffect } from "react";

let total = 0;

const Carrito = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("carrito")) || [];
    setProducts(result);
  }, []);
  // console.log(products);

  console.log(products)

  const deleteOrder = () => {
    const product = JSON.parse(localStorage.getItem("carrito"));
    if (!product) {
      setProducts([]);
    } else {
      localStorage.removeItem("carrito");
    }
  };

  const sendOrders = () => {
    fetch("http://localhost:4000/api/orders", {
      method: "POST",
      body: JSON.stringify(products),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const price = products.map((e) => e.price);

  const totalPrice = price.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    total
  );


  return (
    <div>
      <h1 className="page-content">Mi Carrito</h1>
      <a href="/">Volver</a>
      <div>
        <div>
          <button onClick={() => deleteOrder()}>Vaciar carrito</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Detalle</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          {products.map((e) => {
            <tbody>
            <tr key={e._id}>
              <td>{e.quantity}</td>
              <td>{e.name}</td>
              <td>$ {e.price}</td>
            </tr>
          </tbody>
          })}
        </table>
        <p>Total a Pagar: $ {totalPrice}</p>
        <div className="page-content">
          <button className="button" onClick={() => sendOrders()}>
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
