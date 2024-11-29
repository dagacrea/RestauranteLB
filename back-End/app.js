import express from "express";
import cors from "cors";
import { conectarDB } from "./db.js";
import reservasRouter from "./reservas.js";
import clientesRouter from "./clientes.js";
import usuariosRouter from "./usuarios.js";
import { authConfig } from "./strategy.js";
import authRouter from "./auth.js";
import routerProductos from "./productos.js";
import routerProductosVentas from "./productosVentas.js";
import routerVentas from "./ventas.js";


// Conectar a DB
conectarDB();
console.log("Conectado a base de datos");

const app = express();
const port = 3000;

// interpretar JSON en body
app.use(express.json());

// Habilito cors
app.use(cors());

authConfig();

app.use("/usuarios", usuariosRouter);
app.use("/auth", authRouter);
app.use("/clientes", clientesRouter);
app.use("/reservas", reservasRouter);

app.use("/productos",routerProductos)
app.use("/ventas",routerVentas)
app.use("/productoVentas",routerProductosVentas)


app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en: ${port}`);
});
