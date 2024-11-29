import { Link } from "react-router-dom";
import { useAuth } from "../Componentes/auth";

const Navbar = () => {
  const { sesion, logout } = useAuth();

  const handleLogout = () => {
    logout();
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
            <li><Link to="/login" onClick={handleLogout}>Salir</Link>
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
