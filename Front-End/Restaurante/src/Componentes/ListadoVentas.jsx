
const ListadoVentas = ({ ventas }) => (
    <div>
      <h2>Listado de Ventas</h2>
      <ul>
        {ventas.map((venta, index) => (
          <li key={index}>
            Cliente: {venta.cliente} | Menú: {venta.menu} | Total: ${venta.total}
          </li>
        ))}
      </ul>
    </div>
  );
  
  export default ListadoVentas;
  