import { useEffect, useState } from "react";
import { useRouter } from "next/router";

let carrito = [];
let productInfo = {};

const useProducts = (props) => {
  const products = props.data.data;
  const [productList, setProducts] = useState(products);
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
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

  const createProduct = (props) => {
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
        router.push({ pathname: "/store" });
      });
  };

  
  const getProductDataById = async (props) => {
   await fetch(`http://localhost:4000/api/products/${props}`, {
      method: "GET",
      headers: {
        "Content-type": "application-json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        productInfo = res
      });
  };

  const editProduct = (props) => {

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
        router.push({ pathname: "/store" });
      });
  };

  return {
    productList,
    products,
    productInfo,
    addNewProduct,
    deleteProductFromDB,
    productsCategories,
    deleteFilters,
    createProduct,
    editProduct,
    addNewProduct,
    deleteProductFromDB,
    productsCategories,
    deleteFilters,
    getProductDataById
  };
};

export default useProducts;
