import express from "express";
import { db } from "./db.js";
import { verificarValidacion, validarId, validacionProductoVentas } from "./validacion.js";

const router = express.Router();

// Obtener todos los productos de una venta
router.get("/producto-ventas", async (req, res) => {
    try {
        const [ventaProductos] = await db.execute("SELECT * FROM producto_ventas");
        res.json(ventaProductos);
    } catch (error) {
        console.error("Error al obtener ventas_productos:", error);
        res.status(500).json({ error: "Error al obtener ventas productos" });
    }
});

// Crear una nueva venta
router.post("/producto-ventas",
    validacionProductoVentas(),
    verificarValidacion,
    async (req, res) => {
        const { idproducto, cantidadProducto, precio, idventa } = req.body;

        if (isNaN(idproducto) || isNaN(idventa)) {
            return res.status(400).json({ error: "Los ID de producto y venta deben ser números válidos." });
        }

        try {
            // Validar si idproducto e idventa existen
            const [productoExistente] = await db.execute("SELECT * FROM productos WHERE idproducto = ?", [idproducto]);
            const [ventaExistente] = await db.execute("SELECT * FROM ventas WHERE idventa = ?", [idventa]);

            if (productoExistente.length === 0 || ventaExistente.length === 0) {
                return res.status(400).json({ error: "Producto o venta no válidos" });
            }

            const [result] = await db.execute(
                `INSERT INTO producto_ventas (idproducto, cantidadProducto, precio, idventa)
                VALUES (?, ?, ?, ?)`,
                [idproducto, cantidadProducto, precio, idventa]
            );
            res.status(201).json({ id: result.insertId, message: "producto_ventas se creo con exito" });
        } catch (error) {
            console.error("Error al crear productos_ventas", error);
            res.status(500).json({ error: "Error al crear producto_ventas" });
        }
    });

// Actualizar producto_ventas
router.put("/producto-ventas/:id",
    validarId,
    validacionProductoVentas(),
    verificarValidacion,
    async (req, res) => {
        const { id } = req.params;
        const { idproducto, cantidadProducto, precio, idventa } = req.body;

        if (isNaN(idproducto) || isNaN(idventa)) {
            return res.status(400).json({ error: "Los ID de producto y venta deben ser números válidos." });
        }

        try {
            const [productoVenta] = await db.execute(
                "SELECT * FROM producto_ventas WHERE idproducto_venta = ?",
                [id]
            );
            if (productoVenta.length === 0) {
                return res.status(404).json({ error: "El producto-venta no existe" });
            }

            await db.execute(
                `UPDATE producto_ventas
                    SET idproducto = ?, cantidadProducto = ?, precio = ?, idventa = ?
                    WHERE idproducto_venta = ?`,
                [idproducto, cantidadProducto, precio, idventa, id]
            );
            res.json({ message: "producto_ventas se actualizó con éxito" });

        } catch (error) {
            console.error("Error al actualizar producto_ventas", error);
            res.status(500).json({ error: "Error al actualizar producto_ventas" });
        }
    });

// Eliminar producto_ventas
router.delete("/producto-ventas/:id",
    validarId,
    verificarValidacion,
    async (req, res) => {
        const { id } = req.params;

        try {
            const [productoVenta] = await db.execute(
                "SELECT * FROM producto_ventas WHERE idproducto_venta = ?",
                [id]
            );
            if (productoVenta.length === 0) {
                return res.status(404).json({ error: "El producto-venta no existe" });
            }

            await db.execute("DELETE FROM producto_ventas WHERE idproducto_venta = ?", [id]);
            res.json({ message: "producto_ventas eliminada con éxito" });
        } catch (error) {
            console.error("Error al eliminar producto_ventas", error);
            res.status(500).json({ error: "Error al eliminar producto_ventas" });
        }
    });

export default router;
