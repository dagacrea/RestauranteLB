import { useState } from "react";
import { useAuth } from "./Auth";

export const Nuevareserva = ({ onNuevareserva }) => {
  const { sesion } = useAuth();
  const [reserva, setreserva] = useState("");

  const [clienteId, setclienteId] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sesion.token}`,
      },
      body: JSON.stringify({ reserva, fecha, clienteId }),
    });
    if (response.ok) {
      setreserva("");

      setclienteId(0);
      onNuevareserva();
    }
  };

  return (
    <>
      <h3>Nueva reserva</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reserva">reserva:</label>
          <input
            id="reserva"
            value={reserva}
            onChange={(e) => setreserva(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="completada">Completada:</label>
          <input
            type="checkbox"
            id="completada"
            checked={completada}
            onChange={() => setCompletada(!completada)}
          />
        </div>
        <Seleccionarcliente clienteId={clienteId} onChange={setclienteId} />
        <p>id selecionado: {clienteId}</p>
        <button type="submit">Crear</button>
      </form>
    </>
  );
};
