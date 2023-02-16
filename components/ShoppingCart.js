import useShoppingCart from "../hooks/useShoppingCart";

const ShoppingCart = (columns) => {
  
  const {shippingItems, setColumns,totalPrice,printColumnsField,deleteProduct,clearCarrito,sendOrders} = useShoppingCart(columns)

  if (shippingItems.length >= 1) {
    return (
      <div>
        <div>
          <div>
            <button onClick={() => clearCarrito()}>Vaciar carrito</button>
          </div>
          <table>
            <thead>
              <tr>
                {setColumns.map((title) => (
                  <th>{title.headerName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shippingItems.map((e, index) => (
                <tr key={index}>
                  {setColumns.map((header) => (
                    <td>{printColumnsField(e, header.field)}</td>
                  ))}
                  <button onClick={() => deleteProduct(e._id)}>Eliminar</button>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total a Pagar: $ {totalPrice}</p>
          <div className="page-content">
            <button className="button" onClick={() => sendOrders()}>
              Pagar
            </button>
          </div>
        </div>
      </div>
    );
  } if (!shippingItems || shippingItems.length === 0) {
    return (
      <div>
        <h2>Carrito Vacio</h2>
      </div>
    );
  }
};

export default ShoppingCart;
