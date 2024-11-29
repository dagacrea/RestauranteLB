import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Componentes/auth";
import { useState } from "react";
import "./PaginaLogin.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    const nombre = formData.get("nombre");
    const contraseña = formData.get("contraseña");

    login(
      nombre,
      contraseña,
      () => navigate("/inicio"), // OK
      () => setError(true) // Error
    );

    event.preventDefault();
  };

  return (
    <div className="login-page">
      <form onSubmit={onSubmit} className="login-form">
      <h1 className="h1-input">Restaurante <br />La Riojana</h1>
        <label htmlFor="nombre" className="login-label">Usuario:</label>
        <input name="nombre" type="text" className="login-input" placeholder="Ingresar Usuario" />
        
        <label htmlFor="contraseña" className="login-label">Contraseña:</label>
        <input name="contraseña" type="password" className="login-input" placeholder="Ingresar Contraseña"/>
        
        <button type="submit" className="login-button">Ingresar</button>
        {error && <p className="login-error">Nombre o contraseña inválido</p>}
      </form>
    </div>
  );
};

export default LoginPage;
