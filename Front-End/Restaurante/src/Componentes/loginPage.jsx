import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { useState } from "react";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    const usuario = formData.get("usuario");
    const contraseña = formData.get("contraseña");

    login(
      usuario,
      contraseña,
      () => navigate(from, { replace: true }), // OK
      () => setError(true) // Error
    );

    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="usuario">Usuario:</label>
        <input name="usuario" type="text" />
        <label htmlFor="contraseña">Contraseña:</label>
        <input name="contraseña" type="contraseña" />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p>Usuario o contraseña inválido</p>}
    </>
  );
};
