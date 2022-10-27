import { useState, useEffect } from "react";

let initialValue = 0;

const Carrito = (columns) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const result = JSON.parse(localStorage.getItem("carrito"));
      setProducts(result);
    } catch (err) {
      // 👇️ SyntaxError: Unexpected end of JSON input
      console.log("error", err);
    }
  }, []);

  const printColumnsField = (items, field) => {
    if (field.includes(".")) {
      const objectField = field.split(".");
      return items[objectField[0]][objectField[1]];
    } else {
      return items[field];
    }
  };

  const setColumns = Object.values(columns)[0];

  const items = products.map(({ name, quantity, price }) => ({
    name,
    price,
    quantity,
  }));

  const countItems = products.filter((e) => e.name);

  const firstPrice = Object.values(countItems).reduce(
    (acc, { price }) => acc + price,
    0
  );

  const taxes = firstPrice * 0.21;

  const total = firstPrice + taxes;

  const date = new Date();

  const order = {
    items,
    subtotal: firstPrice,
    taxes,
    total,
    date,
  };

  const deleteProduct = (id) => {
    const deletedProduct = products.filter((e) => e._id !== id);
    setProducts(deletedProduct);
    localStorage.setItem("carrito", deletedProduct);
  };

  const clearCarrito = () => {
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
      body: JSON.stringify(order),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const price = products.map((e) => e.price * e.quantity);

  const totalPrice = price.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  if (products.length >= 1) {
    return (
      <div>
        <div>
          <div>
            <button onClick={() => clearCarrito()}>Vaciar carrito</button>
          </div>
          <table>
            <thead>
              <tr>
                {setColumns.map((title) => (
                  <th>{title.headerName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((e, index) => (
                <tr key={index}>
                  {setColumns.map((header) => (
                    <td>{printColumnsField(e, header.field)}</td>
                  ))}
                  <button onClick={() => deleteProduct(e._id)}>Eliminar</button>
                </tr>
              ))}
            </tbody>
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
  } else if (!products || products.length === 0) {
    return (
      <div>
        <h2>Carrito Vacio</h2>
      </div>
    );
  }
};

export default Carrito;
