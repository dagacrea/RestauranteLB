import { useState, useEffect } from "react";
import { useAuth } from "../Componentes/auth";

export const ListadoReservas = () => {
  const { sesion } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      const response = await fetch("http://localhost:3000/reservas/clientes", {
        headers: { authorization: `Bearer ${sesion.token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setReservas(data.reservasClientes);
      }
      setLoading(false);
    };

    fetchReservas();
  }, [sesion.token]);

  if (loading) {
    return <p>Cargando reservas...</p>;
  }

  return (
    <div>
      <h3>Listado de Reservas</h3>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id_reserva}>
            {reserva.nombre} {reserva.apellido} - Mesa {reserva.idmesa} -{" "}
            {new Date(reserva.fechaAReserv).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
