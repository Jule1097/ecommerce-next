import { useRouter } from 'next/router'
import useProducts from '../hooks/useProducts';

const NewProduct = (props) => {
  const router = useRouter()

  const { createProduct } = useProducts(props);
      
  return (
    <form>
      <div>
        <label>
          Nombre<span></span>
        </label>
        <input type="text" required name="name" id="nombre"></input>
        <label>
          Precio <span className="req"></span>
        </label>
        <input type="number" required name="price" id="price" min="1"></input>
        <label>
          Imagen <span className="req"></span>
        </label>
        <input type="url" required name="image" id="image"></input>
        <label>
          Stock <span className="req"></span>
        </label>
        <input type="number" required name="stock" id="stock" min="1"></input>
        <label>
          Categoria <span className="req"></span>
        </label>
        <input type="name" required name="category" id="category"></input>
      </div>
      <input
        type="button"
        className="button button-block"
        value="Crear Producto"
        onClick={() => createProduct(props)}
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

export default NewProduct;
