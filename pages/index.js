import Products from "../components/Products";


export default function Home(data) {

  return (
    <div className="page-content">
      <title>Mi Tienda</title>
      <div>
        <h1 className="page-content">Ecommerce APP</h1>
        
        <Products data={data} />
      </div>
      <div>
        <a href="/orders">Ver ordenes</a>
      </div>
      <div>
        <a href="/carrito">Ver carrito</a>
      </div>
    </div>
  );
}

const API_URL = "http://localhost:4000/api/products";

export async function getServerSideProps(context) {
  const res = await fetch(API_URL);
  const data = await res.json();

  return {
    props: {
      data,
      protected: true
    },
  };
}
