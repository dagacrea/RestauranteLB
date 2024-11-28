import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li><Link to="/inicio">Inicio</Link></li>
      <li><Link to="/menu">Menú</Link></li>
      <li><Link to="/reservas">Reservas</Link></li>
      <li><Link to="/ventas">Ventas</Link></li>
      <li><Link to="/">Salir</Link></li>
    </ul>
  </nav>
);

export default Navbar;
