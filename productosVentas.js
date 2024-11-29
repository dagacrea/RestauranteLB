import express from "express";
import { db } from "./db.js";
import { verificarValidacion, validarId, validacionProductoVentas } from "./validacion.js";

const routerProductoVentas = express.Router();

// Obtener todos los productos de una venta
routerProductoVentas.get("/", async (req, res) => {
    const [productoVentas] = await db.execute("SELECT * FROM producto_ventas");
    res.json({ datos: productoVentas });
});


// Crear un nuevo producto-venta
routerProductoVentas.post(
    "/",
    validacionProductoVentas(),
    verificarValidacion,
    async (req, res) => {
        const { idproducto, cantidadProducto, precio, idventa } = req.body;

        if (isNaN(idproducto) || isNaN(idventa)) {
            return res.status(400).json({ error: "Los ID de producto y venta deben ser números válidos." });
        }

        // Verificar que el producto y la venta existen
        const [productoExistente] = await db.execute("SELECT * FROM productos WHERE idproducto = ?", [idproducto]);
        const [ventaExistente] = await db.execute("SELECT * FROM ventas WHERE idventa = ?", [idventa]);

        if (productoExistente.length === 0 || ventaExistente.length === 0) {
            return res.status(400).json({ error: "Producto o venta no válidos" });
        }

        // Insertar el producto en la venta
        const [result] = await db.execute(
            "INSERT INTO producto_ventas (idproducto, cantidadProducto, precio, idventa) VALUES (?, ?, ?, ?)",
            [idproducto, cantidadProducto, precio, idventa]
        );

        res.status(201).json({ id: result.insertId, message: "Producto-venta creado con éxito." });
    }
);

// Actualizar un producto-venta
routerProductoVentas.put(
    "/:id",
    validarId,
    validacionProductoVentas(),
    verificarValidacion,
    async (req, res) => {
        const { id } = req.params;
        const { idproducto, cantidadProducto, precio, idventa } = req.body;

        if (isNaN(idproducto) || isNaN(idventa)) {
            return res.status(400).json({ error: "Los ID de producto y venta deben ser números válidos." });
        }

        // Verificar si el producto-venta existe
        const [productoVenta] = await db.execute("SELECT * FROM producto_ventas WHERE idproducto_venta = ?", [id]);
        if (productoVenta.length === 0) {
            return res.status(404).json({ error: "El producto-venta no existe." });
        }

        // Actualizar el producto en la venta
        await db.execute(
            "UPDATE producto_ventas SET idproducto = ?, cantidadProducto = ?, precio = ?, idventa = ? WHERE idproducto_venta = ?",
            [idproducto, cantidadProducto, precio, idventa, id]
        );

        res.json({ message: "Producto-venta actualizado con éxito." });
    }
);

// Eliminar un producto-venta
routerProductoVentas.delete(
    "/:id",
    validarId,
    verificarValidacion,
    async (req, res) => {
        const { id } = req.params;

        // Verificar si el producto-venta existe
        const [productoVenta] = await db.execute("SELECT * FROM producto_ventas WHERE idproducto_venta = ?", [id]);
        if (productoVenta.length === 0) {
            return res.status(404).json({ error: "El producto-venta no existe." });
        }

        await db.execute("DELETE FROM producto_ventas WHERE idproducto_venta = ?", [id]);
        res.json({ message: "Producto-venta eliminado con éxito." });
    }
);

export default routerProductoVentas;
