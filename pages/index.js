import Products from "../components/Products";
import Carrito from "../components/Carrito";

export default function Home(data) {

  return (
    <div className="page-content">
      <title>Mi Tienda</title>
      <div>
        <h1 className="page-content">Ecommerce APP</h1>
        <a href="/carrito">Ver carrito</a>
        <Products data={data} />
      </div>
    </div>
  );
}

const API_URL = "http://localhost:4000/api/products";

export async function getServerSideProps() {
  const res = await fetch(API_URL);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
