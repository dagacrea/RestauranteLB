import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";
import { validarJwt } from "./auth.js";
//import passport from "passport";
const router = express.Router();

// GET /clientes
// Consultar por todos los clientes
router.get("/", async (req, res) => {
  const [clientes] = await db.execute("select * from clientes");
  res.send({ clientes });
});
const validacionCliente = () => [
  body("nombre").isAlpha().isLength({ min: 1, max: 25 }),
  body("apellido").isAlpha().isLength({ min: 1, max: 25 }),
  body("telefono").isInt().isLength({ max: 15 }),
  body("ultimosnumDni").isInt().isLength({ max: 3 }),
];

// POST /clientes
// Crear nuevo cliente
router.post("/", validarJwt, validacionCliente(), async (req, res) => {
  const { nombre, apellido, telefono, ultimosnumDni } = req.body;

  const [clienteExiste] = await db.execute(
    "select * from reservas where nombre=? and apellido=? and telefono=? and ultimosnumDni=?",
    [nombre, apellido]
  );
  if (clienteExiste.length > 0) {
    res.status(400).send({ error: "cliente ya registrado, esta fecha" });
    return;
  }

  // Inserta en DB
  const [result] = await db.execute(
    "insert into clientes (nombre, apellido, telefono, ultimosnumDni) values (?,?,?,?)",
    [nombre, apellido, telefono, ultimosnumDni]
  );
  res.status(201).send({
    cliente: {
      id: result.insertId,
      nombre,
      apellido,
      telefono,
      ultimosnumDni,
    },
  });
});

export default router;
