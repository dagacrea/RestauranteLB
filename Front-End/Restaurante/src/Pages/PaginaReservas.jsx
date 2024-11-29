import { useState, useEffect } from "react";
import { ListadoReservas, NuevaReserva } from "../Componentes/ListaReservas";
import "../App.css";
import { useAuth } from "../Componentes/auth";

const PaginaReservas = () => {
  const { sesion } = useAuth();
  const [reservasClientes, setReservasClientes] = useState([]);

  const getReservas = async () => {
    const response = await fetch("http://localhost:3000/reservas/clientes", {
      headers: { authorization: `Bearer ${sesion.token}` },
    });
    if (response.ok) {
      const { reservasClientes } = await response.json();
      setReservasClientes(reservasClientes);
    }
  };

  useEffect(() => {
    getReservas();
  }, []);

  return (
    <div>
      <h1>Gestión de Reservas</h1>
      <ListadoReservas reservasClientes={reservasClientes} />
      <NuevaReserva onNuevaReserva={getReservas} />
    </div>
  );
};
export default PaginaReservas;
