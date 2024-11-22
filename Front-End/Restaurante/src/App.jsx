import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaMenu from './Pages/PaginaMenu.jsx';
import PaginaReservas from './Pages/PaginaReservas.jsx';
import Navbar from "./Componentes/Navbar";
import Footer from "./Componentes/Footer";
import PaginaInicio from "./Pages/PaginaInicio";
import PaginaVentas from './Pages/PaginaVentas';

const App = () => {
  const reservas = [
    { id: 1, cliente: "Juan Pérez", fecha: "2024-11-20", hora: "19:00", personas: 4 },
    { id: 2, cliente: "Ana Gómez", fecha: "2024-11-21", hora: "20:00", personas: 2 },
    // aca vamos a agregar mas reservas segun sean necesarias
  ];

  const menus = [
    { name: "Menu 1", description: "Plato 1, Plato 2", price: 20 },
    { name: "Menu 2", description: "Plato 3, Plato 4", price: 25 },
    // Agrega mas menus segun sea necesario
  ];

  return (
    <Router>
      <div>
        <Navbar /> {/* Navbar en español */}
        
        <main>
          <Routes>
            <Route path="/" element={<PaginaInicio />} /> 
            <Route path="/menu" element={<PaginaMenu />} />
            <Route path="/reservas" element={<PaginaReservas />} />
            <Route path="/ventas" element={<PaginaVentas reservas={reservas} menus={menus} />} />
          </Routes>
        </main>

        <Footer /> 
      </div>
    </Router>
  );
};

export default App;
