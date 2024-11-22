import GestionVentas from '../Componentes/GestionVentas';

const PaginaVentas = ({ reservas, menus }) => {
  return (
    <div>
      <GestionVentas reservas={reservas} menus={menus} />
    </div>
  );
};

export default PaginaVentas;
