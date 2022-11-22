import { useRouter } from 'next/router'

const NewProduct = (props) => {
  const router = useRouter()
  
  const createProduct = () => {
    const data = {
      name: nombre.value,
      price: price.value,
      image: image.value,
      stock: stock.value,
      category: category.value,
    };

    fetch("http://localhost:4000/api/products", {
      method: "POST",
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
      });

    };

    
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
        onClick={() => createProduct()}
      ></input>
      <input
        type="button"
        className="button button-block"
        value="Cancelar"
        onClick={() => router.push({pathname:"/"})}
      ></input>
    </form>
  );
};

export default NewProduct;
