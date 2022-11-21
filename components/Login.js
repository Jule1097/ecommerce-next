import Router from "next/router";

const Login = () => {

  const getTokenAndUsers = async () => {
    const data = {
      email: email.value,
      password: password.value,
    };

    await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Logged In") {
          alert(res.message);
          localStorage.setItem("token", res.token);
          localStorage.setItem("userRole", res.userRole[0].name)
          Router.push("/");
        } else {
          alert(res.message);
        }
      });
  };

  return (
    <div className="contenido-tab">
      <h1>Iniciar Sesión</h1>
      <form>
        <div>
          <label>
            Email<span></span>
          </label>
          <input type="email" required name="email" id="email"></input>
          <label>
            Contraseña <span className="req"></span>
          </label>
          <input type="password" required name="password" id="password"></input>
        </div>
        <input
          type="button"
          className="button button-block"
          value="Iniciar Sesión"
          onClick={() => getTokenAndUsers()}
        ></input>
      </form>
    </div>
  );
};

export default Login;
