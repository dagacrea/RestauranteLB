import express from "express";
import { db } from "./db.js";
import { verificarValidacion, validarId, validacionProductos } from "./validacion.js";

const routerProductos = express.Router();

// Obtener todos los productos
routerProductos.get("/", async (req, res) => {
    const [result] = await db.execute("SELECT * FROM productos");
    res.json(result);
});

// Obtener un producto por descripción
routerProductos.get("/descripcion", async (req, res) => {
    const { descripcion } = req.query;

    if (!descripcion || descripcion.trim() === "") {
        res.status(400).json({ error: "La descripción es obligatoria para buscar." });
        return;
    }

    const [result] = await db.execute(
        "SELECT * FROM productos WHERE descripcion LIKE ?",
        [`%${descripcion}%`]
    );

    if (result.length === 0) {
        res.status(404).json({ error: "No se encontraron productos con esa descripción." });
        return;
    }

    res.json(result);
});

// Crear un nuevo producto
routerProductos.post(
    "/",
    validacionProductos(),
    verificarValidacion,
    async (req, res) => {
        const { precio, nombre, descripcion } = req.body;

        const [result] = await db.execute(
            "INSERT INTO productos (precio, nombre, descripcion) VALUES (?, ?, ?)",
            [precio, nombre, descripcion]
        );
        res.status(201).json({ id: result.insertId, message: "Producto creado con éxito." });
    }
);

// Actualizar un producto
routerProductos.put(
    "/:id",
    validarId,
    validacionProductos(),
    verificarValidacion,
    async (req, res) => {
        const { id } = req.params;
        const { precio, nombre, descripcion } = req.body;

        const [productoExistente] = await db.execute("SELECT * FROM productos WHERE idproducto = ?", [id]);
        if (productoExistente.length === 0) {
            res.status(404).json({ error: "El producto no existe." });
            return;
        }

        await db.execute(
            "UPDATE productos SET precio = ?, nombre = ?, descripcion = ? WHERE idproducto = ?",
            [precio, nombre, descripcion, id]
        );
        res.json({ message: "Producto actualizado con éxito." });
    }
);

// Eliminar producto
routerProductos.delete(
    "/:id",
    validarId,
    verificarValidacion,
    async (req, res) => {
        const { id } = req.params;

        const [productoExistente] = await db.execute("SELECT * FROM productos WHERE idproducto = ?", [id]);
        if (productoExistente.length === 0) {
            res.status(404).json({ error: "El producto no existe." });
            return;
        }

        await db.execute("DELETE FROM productos WHERE idproducto = ?", [id]);
        res.json({ message: "Producto eliminado con éxito." });
    }
);

export default routerProductos;
