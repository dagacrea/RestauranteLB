import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaginaMenu from "./Pages/PaginaMenu.jsx";
import PaginaReservas from "./Pages/PaginaReservas.jsx";
import Navbar from "./Componentes/Navbar";
import Footer from "./Componentes/Footer";
import PaginaInicio from "./Pages/PaginaInicio";
import PaginaVentas from "./Pages/PaginaVentas";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/menu" element={<PaginaMenu />} />
            <Route path="/reservas" element={<PaginaReservas />} />
            <Route
              path="/ventas"
              element={<PaginaVentas reservas={reservas} menus={menus} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
