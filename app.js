import express from "express";
import cors from "cors";
import { router } from "./reservas.js";
import { conectarDB } from "./db.js";

conectarDB();
console.log(conectarDB());
const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("hola gente");
});
app.use("/reservas", router);
app.listen(port, () => {
  console.log(`la aplicacion esta funcionando en el puerto:${port}`);
});
