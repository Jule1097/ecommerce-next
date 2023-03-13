import NewProduct from "../../components/NewProduct";
import useUser from "../../hooks/useUser";


const addProducts = (props) => {
  
  const { token } = useUser

  return (
    <div>
      <h1>Añadir Productos </h1>
      <NewProduct data= {props} token={token}></NewProduct>
    </div>
  );
};

export default addProducts;
