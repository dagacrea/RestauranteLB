import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/login",
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

    // Obtener usuario
    const [usuarios] = await db.execute(
      "select * from usuarios where nombre=?",
      [nombre]
    );

    if (usuarios.length === 0) {
      res.status(400).send({ error: "Usuario o contraseña inválida" });
      return;
    }

    // Verificar contraseña
    const contraseñaComparada = await bcrypt.compare(
      contraseña,
      usuarios[0].contraseña
    );
    if (!contraseñaComparada) {
      res.status(400).send({ error: "Usuario o contraseña inválida" });
      return;
    }

    // Crear jwt
    const payload = { nombre, rol: "admin", dato: 123 };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // Enviar jwt
    res.send({ token });
  }
);

export default router;
