import express from "express";
import { db } from "./db.js";
import { verificarValidacion, validarId, validacionVenta } from "./validacion.js";

const routerVentas = express.Router();

// Obtener todas las ventas
routerVentas.get("/", async (req, res) => {
    const [ventas] = await db.execute("SELECT * FROM ventas");
    res.json({ datos: ventas });
});

// Obtener una venta por fecha
routerVentas.get("/fecha", async (req, res) => {
    const { fecha } = req.query;

    if (!fecha || fecha.trim() === "") {
        res.status(400).json({ error: "La fecha es obligatoria para buscar." });
        return;
    }

    const [result] = await db.execute(
        "SELECT * FROM ventas WHERE fecha = ?",
        [fecha]
    );

    if (result.length === 0) {
        res.status(404).json({ error: "No se encontraron ventas con esa fecha." });
        return;
    }

    res.json(result);
});

// Crear una nueva venta
routerVentas.post(
    "/",
    validacionVenta(),
    verificarValidacion,
    async (req, res) => {
        const { fecha, vendido, idcliente, totalventa } = req.body;

        const [result] = await db.execute(
            "INSERT INTO ventas (fecha, vendido, idcliente, totalventa) VALUES (?, ?, ?, ?)",
            [fecha, vendido, idcliente, totalventa]
        );
        res.status(201).json({ id: result.insertId, message: "Venta creada con éxito." });
    }
);

// Actualizar una venta
routerVentas.put(
    "/:id",
    validarId,
    validacionVenta(),
    verificarValidacion,
    async (req, res) => {
        const { id } = req.params;
        const { fecha, vendido, idcliente, totalventa } = req.body;

        const [ventaExistente] = await db.execute("SELECT * FROM ventas WHERE idventa = ?", [id]);
        if (ventaExistente.length === 0) {
            res.status(404).json({ error: "La venta no existe." });
            return;
        }

        await db.execute(
            "UPDATE ventas SET fecha = ?, vendido = ?, idcliente = ?, totalventa = ? WHERE idventa = ?",
            [fecha, vendido, idcliente, totalventa, id]
        );
        res.json({ message: "Venta actualizada con éxito." });
    }
);

// Eliminar una venta
routerVentas.delete(
    "/:id",
    validarId,
    verificarValidacion,
    async (req, res) => {
        const { id } = req.params;

        const [ventaExistente] = await db.execute("SELECT * FROM ventas WHERE idventa = ?", [id]);
        if (ventaExistente.length === 0) {
            res.status(404).json({ error: "La venta no existe." });
            return;
        }

        await db.execute("DELETE FROM ventas WHERE idventa = ?", [id]);
        res.json({ message: "Venta eliminada con éxito." });
    }
);

export default routerVentas;
