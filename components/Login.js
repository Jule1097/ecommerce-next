import useUser from "../hooks/useUser";

const Login = () => {

  const {signIn} = useUser()

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
          onClick={() => signIn(email,password)}
        ></input>
      </form>
    </div>
  )};


export default Login;
