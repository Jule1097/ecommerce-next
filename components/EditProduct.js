import { useEffect, useState } from "react";

const EditProduct = ({ id }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application-json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setProduct(res)
      });
  }, []);

  

  return (
    <form>
      <div>
        <label>
          Nombre<span></span>
        </label>
        <input type="text" required name="name" id="nombre" value={product.name}></input>
        <label>
          Precio <span className="req"></span>
        </label>
        <input type="number" required name="price" id="price" min="1" value={product.price}></input>
        <label>
          Imagen <span className="req"></span>
        </label>
        <input type="url" required name="image" id="image" value={product.image}></input>
        <label>
          Stock <span className="req"></span>
        </label>
        <input type="number" required name="stock" id="stock" min="1" value={product.stock}></input>
      </div>
      <input
        type="button"
        className="button button-block"
        value="Guardar"
        onClick={() => sd}
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
