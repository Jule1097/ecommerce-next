import { useEffect, useState } from "react";

let carrito = [];

const useProducts = (props) => {
  const products = props.data.data;
  const [productList, setProducts] = useState([]);
  const [role, setRole] = useState("");

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

  const addNewProduct = (productId) => {
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


  return {
    productList,
    products,
    addNewProduct,
    deleteProductFromDB,
    productsCategories,
    deleteFilters
  }
};

export default useProducts;
