import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const havePermissions = (route) => {

  const [role, setRole] = useState("");
  const [rolePermissions, setRolePermissions] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);

    const getRole = localStorage.getItem("userRole");

    if(getRole) {
      const permissionsByRole = roles.find((e) => e.Role === getRole).Permissions;
      setRolePermissions(permissionsByRole);
    }
  }, []);

  const roles = [
    {
      Role: "admin",
      Permissions: [
        {
          Models: "store",
          Actions: ["GET", "POST", "PUT", "DELETE"],
        },
        {
          Models: "orders",
          Actions: ["GET", "DELETE"],
        },
      ],
    },
    {
      Role: "user",
      Permissions: [
        {
          Models: "/",
          Actions: ["GET"],
        },
      ],
    },
  ];

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
  const checkModelAndActions = rolePermissions.some((e) => e.Models.includes(getModelFromRoute) && rolePermissions.some((e) => e.Actions.includes(setAction))
  );

  if (checkModelAndActions) {
    return true;
  } else {
    return false;
  }
};

export default havePermissions;
