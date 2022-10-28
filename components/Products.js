import { Fragment, useEffect, useState } from "react";

let carrito = [];

const showProducts = (data) => {
  const products = data.data.data;

  const [productList, setProducts] = useState([]);

  useEffect(() => {
    setProducts(products);
  }, []);

  const productsCategories = (category) => {
    const findCategory = products.filter((e) => e.category === category);

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

  return (
    <Fragment>
      <h4>
        Categorias
        {products.map((e) => (
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
        </div>
      ))}
    </Fragment>
  );
};

export default showProducts;
