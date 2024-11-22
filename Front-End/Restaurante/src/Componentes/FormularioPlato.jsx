import  { useState } from 'react'; //react, si no anda

const FormularioPlato = ({ alGuardar }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const alEnviar = (e) => {
    e.preventDefault();
    alGuardar({ nombre, precio, descripcion });
  };

  return (
    <form onSubmit={alEnviar}>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del plato" />
      <input type="text" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" />
      <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción"></textarea>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default FormularioPlato;
