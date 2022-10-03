import { useEffect, useState } from "react";

const Orders = (columns) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/orders", {
      method: "GET",
      headers: {
        "Content-type": "application-json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setOrders(res);
      });
  }, []);
  
  const setColumns = Object.values(columns)[0];

  const printColumnsField = (order, field) => {
    if (field.includes(".")) {
      const objectField = field.split(".");
      return order.items.map(e => e[objectField[1]]);
    } else {
      return order[field];
    }
  };

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
