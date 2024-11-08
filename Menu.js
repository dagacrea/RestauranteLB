import express, { json } from "express"
import { db } from "./db"

const router = express.Router();

//Obtener todos los platos
router.get("/platos",async(req, res)=>{
    try{
        const [result]= await db.execute("select * from menu")
        res.json(result)
    }catch(error){
        console.error("error al obeter el menu", error);
        res.status(500).json({error:"error al obtener el manu"})
    }
});

//Crear un nuevo plato
router.post("/platos", async (req, res)=>{
    const {nombre, descripcion, precio, disponible} = req.body;
    try{
        const [result] = await db.execute(
            "INSERT INTO menu (nombre, descripcion, precio, disponibilidad ) values (?, ?, ?, ?)",
            [nombre, descripcion, precio, disponible ?? true]
        );
        res.status(201).json({id: result.insertId, message: "Plato creado con exito"});
    } catch (error) {
        console.error("Error al crear el plato", error);
        res.status(500).json({error: "Error al crear el plato"});
    }
});


//Actualizar un plato
router.put("/Platos", async(req, res)=>{
    const {id} = req.params;
    const {nombre, descripcion, precio, disponible} = req.body;
    try{
        await db.execute(
            "UPDATE menu SET nombre =?, descripcion =?, precio =?, disponible =? where id = ?",
            [nombre, descripcion, precio, disponible, id]
        );
        res.json({message: "Plato actualizado con exito"})
    } catch(error){
        console.error("error al actualizar el plato:", error);
        res.status(500).json({error:"error al actulizar el plato"});
    }
});

//Eliminar plato

router.delete("/Platos/:id", async (req, res)=>{
    const{id} = req.params;
    try{
        await db.execute("DELETE FROM menu WHERE id = ?", [id]);
        res.json({message:"Plato Eliminado"})
    } catch (error){
        console.error("Error Al Eliminar El Plato:", error);
        res.status(500).json({error: "Error Al Eliminar El Plato"});
    }
});

export default router;