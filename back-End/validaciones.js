import { body, param, validationResult } from "express-validator";

// Enviar errores de validacion en caso de ocurrir alguno.////////////////////////////////////////////////////////////////
export const verificarValidacion = (req, res, next) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    return res.status(400).send({ errores: validacion.array() });
  }
  next();
};

//validacion param id/////////////////////////////////////////////////////////////////////////////////////////////////////
export const validarId = param("id").isInt({ min: 1 });

//vallidacion  rol///////////////////////////////////////////////////////////////////////////////////////////////////////
export const validarRol = (rol) => (req, res, next) => {
  if (req.user.rol !== rol) {
    return res
      .status(400)
      .send({ mensaje: "No esta autorizado para realizar esta accion" });
  }
  next();
};

//validacion body reserva////////////////////////////////////////////////////////////////////////////////////////////////
export const validarReserva = [
  body("idcliente")
    .notEmpty()
    .withMessage("El idcliente no puede estar vacío."),
  body("idmesa")
    .isInt({ min: 1, max: 14 })
    .withMessage("El idmesa debe ser un número entre 1 y 14."),
  body("fecha")
    .isISO8601()
    .withMessage("La fecha debe tener un formato válido (ISO8601)."),
  body("fechaAReserv")
    .isISO8601()
    .withMessage("La fecha de reserva debe tener un formato válido (ISO8601).")
    .custom((value) => {
      const now = new Date().toISOString();
      if (value < now) {
        return false;
      }
      return true;
    })
    .withMessage("La fecha de reserva no puede ser en el pasado."),
];
//validar usuario ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const validarusuario = [
  body("nombre")
    .isAlphanumeric()
    .withMessage("El nombre solo debe contener letras y números.")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío.")
    .isLength({ max: 25 })
    .withMessage("El nombre no puede exceder los 25 caracteres."),
  body("contraseña")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número, sin símbolos."
    ),
];
