import Products from "../components/Products";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import OrderButton from "../components/OrderButton";

export default function Home(data) {
  const { logOut, token } = useUser();

  const router = useRouter();

    return (
      <div className="page-content">
        <title>Mi Tienda</title>
        <div>
          <h1 className="page-content">Ecommerce APP</h1>
          <Products data={data} token={token} />
        </div>
        <div>
          <OrderButton />
        </div>
        <div>
          <a href="/carrito">Ver carrito</a>
        </div>
        <div>
          <button onClick={() => logOut()}>Cerrar Sesión</button>
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
      protected: true,
    },
  };
}
