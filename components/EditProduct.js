import { useEffect, useState } from "react";
import { useRouter } from 'next/router' 
import useProducts from "../hooks/useProducts";

const EditProduct = (props) => {
  const router = useRouter();

  const { setProducts, productInfo, editProduct} = useProducts(props);

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

  const sendEditProduct = async () =>  {
    const data = {
      id: id.value,
      name: nombre.value,
      price: price.value,
      image: image.value,
      stock: stock.value,
      category: category.value,
    };

    await fetch(`http://localhost:4000/api/products/${props.id}`, {
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
        router.push({pathname:"/store"});
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
          value={productInfo.name}
          onChange={(e) => setProducts({ ...productInfo, name: e.target.nombre })}
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
          value={productInfo.price}
          onChange={(e) => setProducts({ ...productInfo, price: e.target.price })}
        ></input>
        <label>
          Imagen <span className="req"></span>
        </label>
        <input
          type="url"
          required
          name="image"
          id="image"
          value={productInfo.image}
          onChange={(e) => setProducts({ ...productInfo, image: e.target.image })}
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
          value={productInfo.stock}
          onChange={(e) => setProducts({ ...productInfo, stock: e.target.stock })}
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
        value={productInfo.category}
      ></input>
      <input
        type="button"
        className="button button-block"
        value="Guardar"
        onClick={() => editProduct(props)}
      ></input>
      <input
        type="button"
        className="button button-block"
        value="Cancelar"
        onClick={() => router.push({pathname:"/store"})}
      ></input>
    </form>
  );
};

export default EditProduct;
