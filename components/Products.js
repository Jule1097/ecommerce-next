import Router from "next/router";
import { Fragment, useEffect, useState } from "react";

let carrito = [];

const showProducts = (data) => {
  const products = data.data.data;

  const [productList, setProducts] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setProducts(products);
    setToken(getToken);
  }, []);

  const productsCategories = (category) => {
    const findCategory = productList.filter((e) => e.category === category);
    setProducts(findCategory);
  };

  const deleteFilters = () => {
    setProducts(products);
  };

  const addNewProduct = (productId, name) => {
    const product = productList.find((e) => e._id === productId);

    if (checkProductExist(productId)) {
      product.quantity++;
    } else {
      carrito.push(product);
      product.quantity = 1;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(carrito);
  };

  const checkProductExist = (productId) => {
    return carrito.map((e) => e._id).includes(productId);
  };

  const deleteProductFromDB =  (id) => {
    fetch(`http://localhost:4000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then(() => {
      const newData = productList.filter(e => e._id !== id)
      setProducts(newData)
    })
  };

  return (
    <Fragment>
      <h4>
        Categorias
        {productList.map((e) => (
          <li key={e._id} onClick={() => productsCategories(e.category)}>
            {e.category}
          </li>
        ))}
      </h4>
      <button onClick={() => deleteFilters()}>Borrar Filtros</button>
      {productList.map((e) => (
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
          <button onClick={() => deleteProductFromDB(e._id)}>Eliminar</button>
          <button>Editar</button>
        </div>
      ))}
    </Fragment>
  );
};

export default showProducts;
