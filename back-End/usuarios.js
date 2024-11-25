import express from "express";
import { db } from "./db.js";
import bcrypt from "bcrypt";
import {
  validarId,
  validarRol,
  validarusuario,
  verificarValidacion,
} from "./validaciones.js";

const router = express.Router();

// GET /usuarios
// Consultar por todos los usuarios
router.get("/", async (req, res) => {
  const [usuarios] = await db.execute("select id,nombre from usuarios");
  res.send({ usuarios });
});

// POST /usuarios
// Crear nuevo usuario
router.post("/", validarusuario, verificarValidacion(), async (req, res) => {
  const { nombre, contraseña } = req.body;

  // Crear hash de la contraseña
  const contraseñaHashed = await bcrypt.hash(contraseña, 10);

  // Inserta en DB
  const [result] = await db.execute(
    "insert into usuarios (nombre, contraseña) values (?,?)",
    [nombre, contraseñaHashed]
  );
  res.status(201).send({ usuario: { id: result.insertId, nombre } });
});

router.delete(
  "/",
  validarRol("admin"),
  validarId,
  verificarValidacion,
  async (req, res) => {
    const id = number(req.params.id);
    await db.execute("delete from usuarios where id=?", [id]);
    res.send({ id });
  }
);
export default router;
