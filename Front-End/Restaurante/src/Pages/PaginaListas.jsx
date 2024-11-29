import { ListadoReservas } from "../Componentes/ListaReservas";
import "../App.css";

const PaginaListas = () => {
  return (
    <div>
      <h1>Lista de Clientes y Lista de Reservas</h1>

      <div>
        <ListadoReservas />
      </div>
    </div>
  );
};

export default PaginaListas;
