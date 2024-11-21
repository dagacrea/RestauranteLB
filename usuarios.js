import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

const router = express.Router();

// GET /usuarios
// Consultar por todos los usuarios
router.get("/", async (req, res) => {
  const [usuarios] = await db.execute("select * from usuarios");
  res.send({ usuarios });
});

// POST /usuarios
// Crear nuevo usuario
router.post(
  "/",
  body("nombre").isAlphanumeric().notEmpty().isLength({ max: 25 }),
  body("contraseña").isStrongPassword({
    minLength: 8, // Minino de 8 caracteres (letras y numeros)
    minLowercase: 1, // Al menos una letra minuscula
    minUppercase: 1, // Al menos una letra mayusculas
    minNumbers: 1, // Al menos un numero
    minSymbols: 0, // Sin simbolos
  }),
  async (req, res) => {
    // Enviar errores de validacion en caso de ocurrir alguno.
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errores: validacion.array() });
      return;
    }

    const { nombre, contraseña } = req.body;

    // Crear hash de la contraseña
    const contraseñaHashed = await bcrypt.hash(contraseña, 10);

    // Inserta en DB
    const [result] = await db.execute(
      "insert into usuarios (nombre, contraseña) values (?,?)",
      [nombre, contraseñaHashed]
    );
    res.status(201).send({ usuario: { id: result.insertId, nombre } });
  }
);

export default router;
