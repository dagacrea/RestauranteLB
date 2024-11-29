import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaginaMenu from "./Pages/PaginaMenu.jsx";
import PaginaReservas from "./Pages/PaginaReservas.jsx";
import PaginaInicio from "./Pages/PaginaInicio";
//import PaginaVentas from "./Pages/PaginaVentas";
import LoginPage from "./Pages/PaginaLogin.jsx";
import LayoutGeneral from "./Componentes/LayoutGeneral";
import { AuthPage } from "./Componentes/auth.jsx";
import PaginaListas from "./Pages/PaginaListas.jsx";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/inicio"
        element={
          <AuthPage>
            <LayoutGeneral>
              <PaginaInicio />
            </LayoutGeneral>
          </AuthPage>
        }
      />
      <Route
        path="/menu"
        element={
          <AuthPage>
            <LayoutGeneral>
              <PaginaMenu />
            </LayoutGeneral>
          </AuthPage>
        }
      />
      <Route
        path="/reservas"
        element={
          <AuthPage>
            <LayoutGeneral>
              <PaginaReservas />
            </LayoutGeneral>
          </AuthPage>
        }
      />
      <Route
        path="/Listas"
        element={
          <AuthPage>
            <LayoutGeneral>
              <PaginaListas />
            </LayoutGeneral>
          </AuthPage>
        }
      />
    </Routes>
  );
};

export default App;
