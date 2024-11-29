import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaginaMenu from "./Pages/PaginaMenu.jsx";
import PaginaReservas from "./Pages/PaginaReservas.jsx";
import PaginaInicio from "./Pages/PaginaInicio";
import PaginaVentas from "./Pages/PaginaVentas";
import Login from "./Componentes/Login";
import LayoutGeneral from "./Componentes/LayoutGeneral";

const App = () => {
  const reservas = [
    {
      id: 1,
      cliente: "Juan Pérez",
      fecha: "2024-11-20",
      hora: "19:00",
      personas: 4,
    },
    {
      id: 2,
      cliente: "Ana Gómez",
      fecha: "2024-11-21",
      hora: "20:00",
      personas: 2,
    },
  ];

  const menus = [
    { name: "Menu 1", description: "Plato 1, Plato 2", price: 20 },
    { name: "Menu 2", description: "Plato 3, Plato 4", price: 25 },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/inicio"
          element={
            <LayoutGeneral>
              <PaginaInicio />
            </LayoutGeneral>
          }
        />
        <Route
          path="/menu"
          element={
            <LayoutGeneral>
              <PaginaMenu />
            </LayoutGeneral>
          }
        />
        <Route
          path="/reservas"
          element={
            <LayoutGeneral>
              <PaginaReservas />
            </LayoutGeneral>
          }
        />
        <Route
          path="/ventas"
          element={
            <LayoutGeneral>
              <PaginaVentas reservas={reservas} menus={menus} />
            </LayoutGeneral>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
