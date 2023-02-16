import NewProduct from "../../components/NewProduct";
import useToken from "../../hooks/useToken";


const addProducts = (props) => {
  
  const { token } = useToken

  return (
    <div>
      <h1>Añadir Productos </h1>
      <NewProduct data= {props} token={token}></NewProduct>
    </div>
  );
};

export default addProducts;
