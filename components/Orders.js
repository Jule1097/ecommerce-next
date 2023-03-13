import havePermissions from "../helpers/havePermissions";
import useOrders from "../hooks/useOrders";

const Orders = (columns) => {
  
  const {orders, printColumnsField, setColumns} = useOrders(columns) 

  
    return (
      <table>
        <thead>
          <tr>
            {setColumns.map((title) => (
              <th>{title.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((e, index) => (
            <tr key={index}>
              {setColumns.map((header) => (
                <td>{printColumnsField(e, header.field)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  
};

export default Orders;
