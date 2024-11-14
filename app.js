import express from "express";
import cors from "cors";

import { conectarDB } from "./db.js";
import router from "./Menu.js";


conectarDB();
console.log("Conectado a base de datos");

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("hola gente");
});


app.use("/api/menu",router)

app.listen(port, () => {
  console.log(`la aplicacion esta funcionando en el :${port}`);
});
