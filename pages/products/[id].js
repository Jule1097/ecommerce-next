import EditProduct from "/components/EditProduct";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";

const products = (props) => {

  const {token} = useUser()
  const router = useRouter();
  const { id } = router.query;

  return <EditProduct data={props} id={id} token={token}></EditProduct>;
};

export default products;
