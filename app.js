import express from "express";
import cors from "cors";

import { conectarDB } from "./db.js"
import routerProductos from "./productos.js";
import routerProductosVentas from "./productosVentas.js";
import routerVentas from "./ventas.js";

conectarDB();
console.log("Conectado a base de datos");

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("hola gente");
});


app.use("/productos",routerProductos)
app.use("/ventas",routerVentas)
app.use("/productoVentas",routerProductosVentas)

app.listen(port, () => {
  console.log(`la aplicacion esta funcionando en el :${port}`);
});
