const ListaReservas = ({ reservas, alActualizarEstado }) => (
  <div>
    <h2>Listado de Reservas</h2>
    <ul>
      {reservas.map((reserva) => (
        <li key={reserva.id}>
          {reserva.fecha} - {reserva.hora} - {reserva.personas} personas
          <button className="confirmar" onClick={() => alActualizarEstado(reserva.id, 'confirmada')}>Confirmar</button>
          <button className="cancelar" onClick={() => alActualizarEstado(reserva.id, 'cancelada')}>Cancelar</button>
        </li>
      ))}
    </ul>
  </div>
);

export default ListaReservas;
