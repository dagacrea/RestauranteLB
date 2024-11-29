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

//validacion para ventas
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

//validacion de productosDeVentas

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

//validacion de produtos
export const validacionProductos = () => [
  body("precio")
      .isFloat({ gt: 0 })
      .withMessage("El precio debe ser un número mayor a 0.")
      .notEmpty()
      .withMessage("El precio es obligatorio."),
  body("nombre")
      .isString()
      .withMessage("El nombre debe ser un texto válido.")
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage("El nombre debe tener entre 3 y 50 caracteres.")
      .notEmpty()
      .withMessage("El nombre es obligatorio."),
  body("descripcion")
      .isString()
      .withMessage("La descripción debe ser un texto válido.")
      .optional({ checkFalsy: true }) // Permite que sea opcional
      .isLength({ max: 200 })
      .withMessage("La descripción no puede exceder los 200 caracteres.")
];