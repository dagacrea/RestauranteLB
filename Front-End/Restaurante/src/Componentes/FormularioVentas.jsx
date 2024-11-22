
const FormularioVentas = ({ reservas, menus, onRegistrarVenta }) => {
    const handleSubmit = (event) => {
      event.preventDefault();
      const { cliente, menu, total } = event.target.elements;
      
      const nuevaVenta = {
        cliente: cliente.value,
        menu: menu.value,
        total: total.value,
      };
      
      onRegistrarVenta(nuevaVenta);  // Llama a la función para registrar la venta
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="cliente" placeholder="Cliente" required />
        <select name="menu" required>
          {menus.map((menu, index) => (
            <option key={index} value={menu.name}>{menu.name}</option>
          ))}
        </select>
        <input type="number" name="total" placeholder="Total" required />
        <button type="submit">Registrar Venta</button>
      </form>
    );
  };
  
  export default FormularioVentas;
  