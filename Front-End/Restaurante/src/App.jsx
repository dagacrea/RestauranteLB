import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaginaMenu from "./Pages/PaginaMenu.jsx";
import PaginaReservas from "./Pages/PaginaReservas.jsx";
import PaginaInicio from "./Pages/PaginaInicio";
//import PaginaVentas from "./Pages/PaginaVentas";
import LoginPage from "./Pages/PaginaLogin.jsx";
import LayoutGeneral from "./Componentes/LayoutGeneral";
import { AuthPage } from "./Componentes/auth.jsx";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
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
    </Routes>
  );
};

export default App;
