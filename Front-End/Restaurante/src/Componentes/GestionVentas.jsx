import { useState } from 'react';
import FormularioVentas from './FormularioVentas';
import ListadoVentas from './ListadoVentas';

const GestionVentas = ({ reservas, menus }) => {
  const [ventas, setVentas] = useState([]);  // Estado que guarda las ventas

  const registrarVenta = (nuevaVenta) => {
    setVentas([...ventas, nuevaVenta]);  // Añade la nueva venta al estado
  };

  return (
    <div>
      <h1>Gestión de Ventas</h1>
      <FormularioVentas reservas={reservas} menus={menus} onRegistrarVenta={registrarVenta} />
      <ListadoVentas ventas={ventas} />
    </div>
  );
};

export default GestionVentas;
