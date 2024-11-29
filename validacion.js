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

//funcion validator ventas
export const validacionVenta = () => [
  body("fecha")
  .isISO8601()
  .withMessage("La fecha debe estar en formato ISO (YYYY-MM-DD)."),
  body("totalventa")
  .isFloat({ min: 0 })
  .withMessage("El total de la venta debe ser un número positivo."),
  body("vendido")
  .isBoolean()
  .withMessage("El campo 'vendido' debe ser verdadero o falso."),
  body("idcliente")
  .isInt()
  .withMessage("El ID del cliente debe ser un número entero."),
];

//validacion de ventas productos

export const validacionProductoVentas = () => [
  body("idventa")
  .isInt()
  .withMessage("El ID de la venta debe ser un número entero."),
  body("idproducto")
  .isInt()
  .withMessage("El ID del producto debe ser un número entero."),
  body("cantidad")
  .isInt({ min: 1 })
  .withMessage("La cantidad debe ser un número entero mayor o igual a 1."),
  body("precio_unitario")
  .isFloat({ min: 0 })
  .withMessage("El precio unitario debe ser un número positivo."),
];
