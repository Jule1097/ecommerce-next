import EditProduct from "/components/EditProduct";
import { useRouter } from "next/router";
import useToken from "../../hooks/useToken";

const products = (props) => {

  const {token} = useToken

  const router = useRouter();
  const { id } = router.query;

  return <EditProduct data={props} id={id} token={token}></EditProduct>;
};

export default products;
