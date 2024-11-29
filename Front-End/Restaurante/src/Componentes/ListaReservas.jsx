//import { useState, useEffect } from "react";
import { useAuth } from "./auth";

export const ListadoReservas = () => {
  return (
    <>
      <h3>Listado</h3>
      <ul>
        {reservasClientes.map((reservaCliente) => (
          <li key={reservaCliente.id}>
            {reservaCliente.nombre} {reservaCliente.idmesa}
            {reservaCliente.fechaAReserv}
          </li>
        ))}
      </ul>
    </>
  );
};

export const NuevaReserva = ({ onNuevaReserva }) => {
  const { sesion } = useAuth();

  const handleSubmit = async (e) => {
    // Obtener los valores del formulario usando FormData
    const formData = new FormData(e.target);
    const nuevaReserva = {
      idmesa: formData.get("mesa"),
      fecha: formData.get("fecha"),
      fechaAReserv: formData.get("fechaAReserv"),
      idcliente: formData.get("cliente"),
    };

    const response = await fetch("http://localhost:3000/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sesion.token}`,
      },
      body: JSON.stringify(nuevaReserva),
    });

    if (response.ok) {
      e.target.reset();
      onNuevaReserva();
    }
    e.preventDefault();
  };

  return (
    <>
      <h3>Nueva Reserva</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mesa">Mesa:</label>
          <input id="mesa" name="mesa" type="number" required />
        </div>
        <div>
          <label htmlFor="fecha">Fecha de Solicitud:</label>
          <input id="fecha" name="fecha" type="datetime-local" required />
        </div>
        <div>
          <label htmlFor="fechaAReserv">Fecha y hora para la Reserva:</label>
          <input
            id="fechaAReserv"
            name="fechaAReserv"
            type="datetime-local"
            required
          />
        </div>
        <div>
          <label htmlFor="cliente">Clienteid:</label>
          <input id="cliente" name="cliente" type="number" required />
        </div>

        <button type="submit">Crear Reserva</button>
      </form>
    </>
  );
};
