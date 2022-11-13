import { useEffect, useState } from "react";
import { Router } from "react-router";

const EditProduct = (props) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/products/${props.id}`, {
      method: "GET",
      headers: {
        "Content-type": "application-json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);
      });
  }, []);

  const sendEditProduct = () => {
    const data = {
      id: id.value,
      name: nombre.value,
      price: price.value,
      image: image.value,
      stock: stock.value,
      category: category.value,
    };

    fetch(`http://localhost:4000/api/products/${props.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": props.token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        Router.push("/");
      });
  };

  return (
    <form>
      <div>
        <label>
          ID<span></span>
        </label>
        <input type="text" required name="id" id="id" value={props.id}></input>
        <label>
          Nombre<span></span>
        </label>
        <input
          type="text"
          required
          name="name"
          id="nombre"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.nombre })}
        ></input>
        <label>
          Precio <span className="req"></span>
        </label>
        <input
          type="number"
          required
          name="price"
          id="price"
          min="1"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.price })}
        ></input>
        <label>
          Imagen <span className="req"></span>
        </label>
        <input
          type="url"
          required
          name="image"
          id="image"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.image })}
        ></input>
        <label>
          Stock <span className="req"></span>
        </label>
        <input
          type="number"
          required
          name="stock"
          id="stock"
          min="1"
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: e.target.stock })}
        ></input>
      </div>
      <label>
        Categoria<span></span>
      </label>
      <input
        type="text"
        required
        name="category"
        id="category"
        value={product.category}
      ></input>
      <input
        type="button"
        className="button button-block"
        value="Guardar"
        onClick={() => sendEditProduct()}
      ></input>
      <input
        type="button"
        className="button button-block"
        value="Cancelar"
        onClick={() => handleBackButton()}
      ></input>
    </form>
  );
};

export default EditProduct;
