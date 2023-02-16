import ShoppingCart from "../components/ShoppingCart";

const carrito = () => {
  
    return (
      <div>
        <h1 className="page-content">Mi Carrito</h1>
        <a href="/store">Volver</a>
        <ShoppingCart
          columns={[
            { id: 1, field: "quantity", headerName: "Cantidad" },
            { id: 2, field: "name", headerName: "Producto" },
            { id: 3, field: "price", headerName: "Precio Unitario" },
          ]}
        ></ShoppingCart>
      </div>
    );
};

export default carrito;
