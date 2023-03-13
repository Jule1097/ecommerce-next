import havePermissions from "../helpers/havePermissions";

const OrderButton = () => {

if (havePermissions("/orders")) {
    return (
        <a href="/orders">Ver ordenes</a>
    );
  }
}
 
export default OrderButton;