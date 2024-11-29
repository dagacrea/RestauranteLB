//import { useState, useEffect } from "react";
import { useAuth } from "./auth";

export const ListadoReservas = ({ reservasClientes }) => {
  return (
    <div className="reservas-page">
      <ul className="listado-reservas">
        {reservasClientes.map((reservaCliente) => (
          <li key={reservaCliente.id}>
            {reservaCliente.nombre} - Mesa: {reservaCliente.idmesa} - Fecha:{" "}
            {reservaCliente.fechaAReserv}
          </li>
        ))}
      </ul>
    </div>
  );
};


export const NuevaReserva = ({ onNuevaReserva }) => {
  const { sesion } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="reservas-container">
      <form onSubmit={handleSubmit} className="nueva-reserva-form">
        <h3>Nueva Reserva</h3>
          <label htmlFor="mesa">Mesa:</label>
          <input id="mesa" name="mesa" type="number" required />
      
          <label htmlFor="fecha">Fecha de Solicitud:</label>
          <input id="fecha" name="fecha" type="datetime-local" required />
        
      
          <label htmlFor="fechaAReserv">Fecha y hora para la Reserva:</label>
          <input id="fechaAReserv" name="fechaAReserv" type="datetime-local" required />
        
          <label htmlFor="cliente">Clienteid:</label>
          <input id="cliente" name="cliente" type="number" required />
          <button type="submit">Crear Reserva</button>

      </form>
    </div>
  );
};
