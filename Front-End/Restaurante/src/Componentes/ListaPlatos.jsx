const ListaPlatos = ({ platos }) => (
  <div>
    <h2>Listado de Platos</h2>
    <ul className="lista-platos">
      {platos.map((plato) => (
        <li key={plato.id}>
          {plato.nombre} - ${plato.precio} - {plato.descripcion}
        </li>
      ))}
    </ul>
  </div>
);

export default ListaPlatos;
