import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Componentes/auth";
import { useState } from "react";

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

      () => navigate(from, { replace: true }), // OK
      () => setError(true) // Error
    );

    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="nombre">nombre:</label>
        <input name="nombre" type="text" />
        <label htmlFor="contraseña">Contraseña:</label>
        <input name="contraseña" type="password" />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p>nombre o contraseña inválido</p>}
    </>
  );
};
export default LoginPage;
