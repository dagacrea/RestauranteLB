import { useState } from 'react';
import ListaReservas from '../Componentes/ListaReservas';
import "../App.css";

const PaginaReservas = () => {
  const [reservas, setReservas] = useState([
    { id: 1, fecha: '2024-11-14', hora: '18:00', personas: 4, estado: 'pendiente' },
  ]); // 

  const actualizarEstado = (id, nuevoEstado) => {
    setReservas((prev) =>
      prev.map((reserva) =>
        reserva.id === id ? { ...reserva, estado: nuevoEstado } : reserva
      )
    );
  };

  return (
    <div>
      <h1>Gestión de Reservas</h1>
      <ListaReservas reservas={reservas} alActualizarEstado={actualizarEstado} />
    </div>
  );
};

export default PaginaReservas;
