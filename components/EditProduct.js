import { useRouter } from 'next/router' 
import { useEffect, useState } from 'react';
import useProducts from "../hooks/useProducts";

const EditProduct = (props) => {
  const router = useRouter();
  const {productInfo, editProduct} = useProducts(props);
  const [updateProduct, setUpdateProduct] = useState([]);

  useEffect(() => {
      setUpdateProduct(productInfo)
  }, [])
  
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
          value={updateProduct.name}
          onChange={(e) => setUpdateProduct({...updateProduct, name: e.target.value})}
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
          value={updateProduct.price}
          onChange={(e) => setUpdateProduct({...updateProduct, price: e.target.value})}
        ></input>
        <label>
          Imagen <span className="req"></span>
        </label>
        <input
          type="url"
          required
          name="image"
          id="image"
          value={updateProduct.image}
          onChange={(e) => setUpdateProduct({...updateProduct, image: e.target.value})}
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
          value={updateProduct.stock}
          onChange={(e) => setUpdateProduct({...updateProduct, stock: e.target.value})}
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
        value={updateProduct.category}
        onChange={(e) => setUpdateProduct({...updateProduct, category: e.target.value})}
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
