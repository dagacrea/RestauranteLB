
const ListaPlatos = ({ platos, alVerImagen }) => (
  <div>
    <h2>Listado de Platos</h2>
    <ul>
      {platos.map((plato) => (
        <li key={plato.id}>
          {plato.nombre} - ${plato.precio} - {plato.disponible ? 'Disponible' : 'No Disponible'}
          <button onClick={() => alVerImagen(plato.id)}>Ver Imagen</button>
        </li>
      ))}
    </ul>
  </div>
);

export default ListaPlatos;
