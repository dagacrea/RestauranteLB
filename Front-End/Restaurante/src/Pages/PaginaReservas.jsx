import { useState, useEffect } from "react";

import { NuevaReserva } from "../Componentes/nuevaReserva";
import "../App.css";
import { useAuth } from "../Componentes/auth";

const PaginaReservas = () => {
  const { sesion } = useAuth();
  const [reservas, setReservas] = useState([]);

  const getReservas = async () => {
    const response = await fetch("http://localhost:3000/reservas", {
      headers: { authorization: `Bearer ${sesion.token}` },
    });
    if (response.ok) {
      const { reservas } = await response.json();
      setReservas(reservas);
    }
  };

  useEffect(() => {
    getReservas();
  }, []);

  return (
    <div>
      <h1>Gestión de Reservas</h1>

      <div>
        <NuevaReserva onNuevaReserva={getReservas} />
      </div>
    </div>
  );
};
export default PaginaReservas;
