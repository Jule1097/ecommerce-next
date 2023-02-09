
import useUser from "../hooks/useUser";

const Register = () => {

  const {signUp} = useUser()

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
