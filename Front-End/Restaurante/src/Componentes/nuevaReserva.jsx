import { useState } from "react";
import { useAuth } from "./auth";

export const NuevaReserva = ({ onNuevaReserva }) => {
  const { sesion } = useAuth();
  const [idmesa, setIdmesa] = useState(0);
  const [fecha, setFecha] = useState("");
  const [fechaAReserv, setFechaAReserv] = useState("");
  const [idcliente, setIdcliente] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sesion.token}`,
      },
      body: JSON.stringify({ idmesa, fecha, fechaAReserv, idcliente }),
    });

    if (response.ok) {
      setIdmesa(0);
      setFecha("");
      setFechaAReserv("");
      setIdcliente(0);
      e.target.reset();
      onNuevaReserva();
    }
  };

  return (
    <>
      <h3>Nueva Reserva</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mesa">Mesa:</label>
          <input
            id="mesa"
            name="mesa"
            type="number"
            required
            min={1}
            max={11}
            value={idmesa}
            onChange={(e) => setIdmesa(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="fecha">Fecha de Solicitud:</label>
          <input
            name="fecha"
            type="datetime-local"
            required
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fechaAReserv">Fecha y hora para la Reserva:</label>
          <input
            id="fechaAReserv"
            name="fechaAReserv"
            type="datetime-local"
            value={fechaAReserv}
            required
            onChange={(e) => setFechaAReserv(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cliente">Clienteid:</label>
          <input
            id="cliente"
            name="cliente"
            type="number"
            min={1}
            required
            value={idcliente}
            onChange={(e) => setIdcliente(Number(e.target.value))}
          />
        </div>

        <button type="submit">Crear Reserva</button>
      </form>
    </>
  );
};
