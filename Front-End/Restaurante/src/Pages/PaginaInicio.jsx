import imagenInicio from '../assets/images/imagen-inicio.jpg'; 

const PaginaInicio = () => {
  return (
    <div>
      <h1>Bienvenidos al Restaurante La Riojana</h1>
      <p>Gestioná de forma rápida y sencilla.</p>

      {/* Usamos la clase CSS para la imagen */}
      <img src={imagenInicio} alt="Bienvenidos" className="imagen-inicio" />
    </div>
  );
};

export default PaginaInicio;
