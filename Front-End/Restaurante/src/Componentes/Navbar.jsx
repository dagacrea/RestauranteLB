import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/menu">Menú</Link>
        </li>
        <li>
          <Link to="/reservas">Reservas</Link>
        </li>
        <li>
          <Link to="/ventas">Gestión de Ventas</Link> {/* Agregado el enlace a la página de ventas */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
