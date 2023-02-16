import { useState, useEffect } from "react";

let initialValue = 0;

const useShoppingCart = (columns) => {
  const [shippingItems, setShippingItems] = useState([]);

  useEffect(() => {
    try {
      const result = JSON.parse(localStorage.getItem("carrito"));
      setShippingItems(result);
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

  const items = shippingItems.map(({ name, quantity, price }) => ({
    name,
    price,
    quantity,
  }));

  const countItems = shippingItems.filter((e) => e.name);

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
    const deletedProduct = shippingItems.filter((e) => e._id !== id);
    setShippingItems(deletedProduct);
    localStorage.setItem("carrito", deletedProduct);
  };

  const clearCarrito = () => {
    const product = JSON.parse(localStorage.getItem("carrito"));
    if (!product) {
      setShippingItems([]);
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

  const price = shippingItems.map((e) => e.price * e.quantity);

  const totalPrice = price.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

return {
    shippingItems,
    setColumns,
    totalPrice,
    printColumnsField,
    deleteProduct,
    clearCarrito,
    sendOrders
}
};

export default useShoppingCart;
