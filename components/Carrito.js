import { useState, useEffect } from "react";

let initialValue = 0;

const Carrito = ( columns) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("carrito"));
    setProducts(result);
  }, []);

  const printColumnsField = (items, field) => {
    if(field.includes('.')) {
      const objectField = field.split('.')
      return items[objectField[0]][objectField[1]]
    } else {
      return items[field]
    }
  }

  const setColumns = Object.values(columns)[0]

  const items = products.map(({ name, quantity,price}) => ({
    name,
    price,
    quantity
  }))
  
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
    date
  }
  console.log(order);

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
      body: JSON.stringify(order),
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
    initialValue
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
              {setColumns.map((title) => (
                <th>{title.headerName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {products.map((e, index) => 
            <tr key={index}>
              {setColumns.map(header => (<td>{printColumnsField(e, header.field)}</td>))}
            </tr>)}
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
};



export default Carrito;
