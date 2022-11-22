import NewProduct from "../../components/NewProduct";

const addProducts = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
  }, []);

  return (
    <div>
      <h1>Añadir Productos </h1>
      <NewProduct token={token}></NewProduct>
    </div>
  );
};

export default addProducts;
