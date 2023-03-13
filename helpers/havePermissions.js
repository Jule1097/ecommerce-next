import { useEffect, useState } from "react";

const havePermissions = (route) => {

  const [role, setRole] = useState("");
  const [rolePermissions, setRolePermissions] = useState([]);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);

    const getRole = localStorage.getItem("userRole");

    if(getRole) {
      fetch("http://localhost:4000/api/rolepermissions", {
        method: "GET",
        headers: {
          "Content-type": "application-json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setRolePermissions(res.find(e => e.role === getRole).permissions)
        });
      } 
    }, []);

    console.log(rolePermissions)
    
    
    


  // obtener modelo y accion de route
  const routeSplit = route.split("/");
  let getModelFromRoute = routeSplit[1];
  let setAction = "";

  if (routeSplit.length === 1 || routeSplit.length === 2) {
    // ejemplo si es /products es GET --> .length = 2
    setAction = "GET";
  } else if (routeSplit.length === 3) {
    // ejemplo si es /products/[id] es PUT --> .length = 3
    setAction = "PUT";
  }

  // si contiene el modelo y la accion = True;
  const checkModelAndActions = rolePermissions.some((e) => e.model.includes(getModelFromRoute) && rolePermissions.some((e) => e.actions.includes(setAction)));

  if (checkModelAndActions) {
    return true;
  } else {
    return false;
  }
};

export default havePermissions;
