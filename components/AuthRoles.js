import { useRouter } from "next/router";
import { Fragment } from "react";

const AuthRoles = () => {
  const router = useRouter();

  return (
    <Fragment>
      <div>
        <button onClick={() => router.push({ pathname: "/" })}>Volver</button>
        <h1>Unauthorized</h1>
      </div>
    </Fragment>
  );
};

export default AuthRoles;
