import "../styles/globals.css";
import { TokenContext } from "../components/token";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthRoles from "../components/AuthRoles";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("");
  const [rolePermissions, setRolePermissions] = useState([]);

  const roles = [
    {
      Role: "admin",
      Permissions: [
        {
          Models: "products",
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
          Models: "products",
          Actions: ["GET"],
        },
      ],
    },
  ];

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);

    const getRole = localStorage.getItem("userRole");

    const permissionsByRole = roles.find((e) => e.Role === getRole).Permissions;
    setRolePermissions(permissionsByRole);

    if (getToken) {
      setToken(getToken);
    } else if (!token) {
      router.push({ pathname: "/login" });
    }
  }, []);

  const havePermissions = (route, role) => {

    // obtener modelo y accion de route
    const routeSplit = route.split("/") 
    let getModelFromRoute = routeSplit[1]
    let setAction = "";

    if(routeSplit.length === 1 || routeSplit.length === 2) {
      // ejemplo si es /products es GET --> .length = 2
      setAction = "GET"
  
    } else if (routeSplit.length === 3) {
      // ejemplo si es /products/[id] es PUT --> .length = 3 
      setAction = "PUT"
    }

    if(getModelFromRoute === "") {
      getModelFromRoute = "products"
    }

    // si contiene el modelo y la accion = True;
    const checkModelAndActions = rolePermissions.some(e => e.Models.includes(getModelFromRoute) && rolePermissions.some(e => e.Actions.includes(setAction)))

    if(checkModelAndActions) {
      return true
    } else {
      return false
    }
  }

  if (!havePermissions(router.pathname, role) && router.pathname !== "/login") {
    return <AuthRoles></AuthRoles>;
  }


  return (
    <TokenContext.Provider value={token}>
      <Component {...pageProps} />
    </TokenContext.Provider>
  );
}

export default MyApp;
