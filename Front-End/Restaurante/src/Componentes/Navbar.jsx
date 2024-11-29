import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Componentes/auth";

const Navbar = () => {
  const { sesion, logout } = useAuth(); //
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => {
      navigate("/login", { replace: true });
    });
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        {sesion ? (
          <>
            <li>
              <Link to="/menu">Menú</Link>
            </li>
            <li>
              <Link to="/reservas">Reservas</Link>
            </li>
            <li>
              <Link to="/ventas">Gestión de Ventas</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
