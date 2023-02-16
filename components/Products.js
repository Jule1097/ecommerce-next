import { Fragment, useState } from "react";
import { useRouter } from "next/router";

import havePermissions from "../helpers/havePermissions";
import useProducts from "../hooks/useProducts";


const Products = (props) => {
  const [role, setRole] = useState("");
  const router = useRouter();
  const {productList,products,productsCategories,deleteFilters,addNewProduct,deleteProductFromDB,getProductData} = useProducts(props)


  if (!havePermissions(router.pathname,role) && router.pathname !== "/login" && router.pathname !== "/carrito") {
    return (
      <Fragment>
         <div>
          Categorias
          {products.map((e) => (
              <li 
                  key= {e._id}
                  onClick={() => productsCategories(e.category)}>{e.category}</li>
                  ))}
          </div>
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
        <div>
          Categorias
          {products.map((e) => (
              <li 
                  key= {e._id}
                  onClick={() => productsCategories(e.category)}>{e.category}</li>  
          ))}
         </div>
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
              onClick={() =>{getProductData(e._id);
                router.push({
                  pathname: `/products/${e._id}`,
                });}
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

export default Products;
