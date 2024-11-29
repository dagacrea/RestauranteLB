import { useState } from 'react';
import ListaPlatos from '../Componentes/ListaPlatos';
import FormularioPlato from '../Componentes/FormularioPlato';
import "../App.css";

const PaginaMenu = () => {
  const [platos, setPlatos] = useState([]);

  const agregarPlato = (plato) => {
    setPlatos([...platos, { ...plato, id: platos.length + 1 }]);
  };
  

  return (
    <div>
      <h1>Gestión de Menú</h1>
      <FormularioPlato alGuardar={agregarPlato} />
      <ListaPlatos platos={platos}/>
    </div>
  );
};

export default PaginaMenu;
