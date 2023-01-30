import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import havePermissions from "../helpers/havePermissions";

let carrito = [];

const showProducts = (props) => {
  const [role, setRole] = useState("");
  const [productList, setProducts] = useState([]);

  const router = useRouter();

  const products = props.data.data;
 
  useEffect(() => {
    setProducts(products);
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);

  }, []);

  const productsCategories = (category) => {
    const findCategory = productList.filter((e) => e.category === category);
    setProducts(findCategory);
  };

  const deleteFilters = () => {
    setProducts(productList);
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

  const deleteProductFromDB = (id) => {
    fetch(`http://localhost:4000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": props.token,
      },
    }).then(() => {
      const newData = productList.filter((e) => e._id !== id);
      setProducts(newData);
    });
  };


  if (!havePermissions(router.pathname,role) && router.pathname !== "/login" && router.pathname !== "/carrito") {
    return (
      <Fragment>
        <h4>
          Categorias
          {products.map((e) => (
            <li onClick={() => productsCategories(e.category)}>{e.category}</li>
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
              Agregar al Carrito
            </button>
          </div>
        ))}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h4>
          Categorias
          {products.map((e) => (
            <li onClick={() => productsCategories(e.category)}>{e.category}</li>
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
              Agregar al Carrito
            </button>
            <button onClick={() => deleteProductFromDB(e._id)}>Eliminar</button>
            <button
              onClick={() =>
                router.push({
                  pathname: `/products/${e._id}`,
                })
              }
            >
              Editar
            </button>
          </div>
        ))}
      </Fragment>
    );
  }
};

export default showProducts;
