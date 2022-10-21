import Router from "next/router";

const Register = () => {

  const signUp = async () => {

    const data = {
      username: username.value,
      email: email.value,
      password: password.value
    }

    await fetch("http://localhost:4000/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        Router.push("/login")
      });
    };


  return (
    <div className="contenido-tab">
      <h1>Registrar</h1>
      <form>
        <div>
          <label>
            Nombre de Usuario <span className="req"></span>
          </label>
          <input type="text" required name="username" id="username"></input>
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
          value="Registrar"
          onClick={()=> signUp()}
        ></input>
      </form>
    </div>
  );
};

export default Register;
