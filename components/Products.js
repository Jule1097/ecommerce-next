import { Fragment } from "react";

let productList = [];
let carrito = [];

const showProducts = (data) => {
  productList = data.data.data;

  const car = productList.filter((c) => c.category === "Car");
  const gym = productList.filter((g) => g.category === "Gym");

  const addNewProduct = (productId, name) => {
    const product = productList.find((e) => e._id === productId);

    if (checkProductExist(productId)) {
      product.quantity++;
      product.price *= product.quantity;
    } else {
      carrito.push(product);
      product.quantity = 1;
      product.price *= product.quantity;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    console.log(carrito);
  };

  const checkProductExist = (productId) => {
    return carrito.map((e) => e._id).includes(productId)
  };

  return (
    <Fragment>
      {gym.map((e) => (
        <div key={e._id} className="product-container">
          <h3>{e.name}</h3>
          <img src={e.image} />
          <h2>$ {e.price}</h2>
          <button
            className="button-add"
            onClick={() => addNewProduct(e._id, e.name)}
          >
            Agregar Producto
          </button>
        </div>
      ))}
      {car.map((e) => (
        <div key={e._id} className="product-container">
          <h3>{e.name}</h3>
          <img src={e.image} />
          <h2>$ {e.price}</h2>
          <button
            className="button-add"
            onClick={() => addNewProduct(e._id, e.name)}
          >
            Agregar Producto
          </button>
        </div>
      ))}
    </Fragment>
  );
};

export default showProducts;
