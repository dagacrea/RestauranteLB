import express from "express";
import cors from "cors";
import reservasRouter from "./tareas.js";
import { conectarDB } from "./db.js";

conectarDB();
console.log("Conectado a base de datos");

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("hola gente");
});
app.use("/reservas", reservasRouter);
app.listen(port, () => {
  console.log(`la aplicacion esta funcionando en el :${port}`);
});
