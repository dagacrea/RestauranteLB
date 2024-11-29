import express from "express"
import {db} from "./db.js"
import { verificarValidacion, validacionVenta, validarId } from "./validacion.js";

const router = express.Router();


//obtener ventas 
router.get("/ventas",  async (req, res)=>{
    try{
        const [ventas] = await db.execute("SELECT * FROM ventas");
        res.json(ventas);
    }catch (error) {
        console.error("Error al obtener las ventas", error);
        res.status(500).json({error: "Error al obtener las ventas"})
    }
})


//crear una nueva venta 
router.post("/ventas",
    validacionVenta(), 
    verificarValidacion, 
    async (req, res)=>{
        const {fecha, vendido, idcliente, totalventa} = req.body;
    
        try{
        const [result] =await db.execute(
            "INSERT INTO ventas (fecha, vendido, idcliente, totalventa) values (?, ?, ?, ?)",
            [fecha, vendido, idcliente, totalventa]
        );
        res.status(201).json({id: result.insertId, message:"venta creada con exito"})
    
        } catch(error){
            console.error("Error al crear la venta ", error);
            res.status(500).json({error:"Error al crear la venta"});
    }
});


//Actualizar una venta 

router.put("/ventas/:id", 
    validarId,
    validacionVenta(), 
    verificarValidacion, 
    async (req, res)=>{

        const {id} = req.params;
        const {fecha, vendido, idcliente, totalventa} =req.body;


    
        try{
        const [venta] = await db.execute("SELECT * FROM ventas WHERE idventa = ?", [id])    
        if (venta.length === 0){
            return res.status(404).json({error: "la venta que quiere actualizar no existe"})
        }
        await db.execute(
            "UPDATE ventas SET fecha = ?, vendido = ?, idcliente = ?, totalventa = ? WHERE idventa = ?",
            [fecha, vendido, idcliente, totalventa, id]
        );
        res.json({message: "venta actualizada con exito"})
        } catch (error) {
            console.error("Error al actualizar la venta", error)
            res.status(500).json({error:"Error al actualizar la venta"});
    }
});


//Eliminar venta
router.delete("/ventas/:id", 
    validarId,
    verificarValidacion, 
    async (req, res)=>{
        const {id} = req.params;
    
        try{
        const [venta] = await db.execute("SELECT * FROM ventas WHERE idventa = ?", [id])
        if (venta.length === 0){
            return res.status(404).json({error: "La venta que quiere eliminar no existe"})
        }

        await db.execute("DELETE FROM ventas WHERE idventa = ?", [id]);
        res.json({message:"la venta se elimino con exito"});
        } catch (error) {
            console.error("Error al eliminar la venta", error);
            res.status(500).json({error: "Error al eliminar la venta"})
    }
})


export default router;