import { useState, useEffect } from "react";
import { useAuth } from "./auth";

export const ListadoReservas = () => {
  const { sesion } = useAuth();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/clientes", {
      headers: { Authorization: `Bearer ${sesion.token}` },
    })
      .then((response) => response.json())
      .then(({ clientes }) => setClientes(clientes));
  }, [sesion.token]);

  return (
    <>
      <h3>Listado</h3>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.idcliente}>
            {cliente.nombre} {cliente.idmesa}
            {cliente.fechaAReserv}
          </li>
        ))}
      </ul>
    </>
  );
};
