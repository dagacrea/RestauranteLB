import { useState } from 'react';
import ListaPlatos from '../Componentes/ListaPlatos';
import FormularioPlato from '../Componentes/FormularioPlato';
import "../App.css";

const PaginaMenu = () => {
  const [platos, setPlatos] = useState([]);

  const agregarPlato = (plato) => {
    setPlatos([...platos, { ...plato, id: Date.now(), disponible: true }]);
  };

  return (
    <div>
      <h1>Gestión de Menú</h1>
      <FormularioPlato alGuardar={agregarPlato} />
      <ListaPlatos platos={platos} alVerImagen={(id) => alert(`Ver imagen del plato ${id}`)} />
    </div>
  );
};

export default PaginaMenu;
