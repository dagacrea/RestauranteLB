import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Nombre de usuario"/>
        <input type="password" placeholder="Contraseña"/>
        <Link to="/inicio"><button type="button">Ingresar</button></Link>
      </form>
    </div>
  );
};

export default Login;
