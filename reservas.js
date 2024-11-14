import express from "express";
import { db } from "./db.js";

export const router = express.Router();

router.get("/", async (req, res) => {
  const respuesta = await db.execute("select * from reservas");
  console.log(respuesta);
  res.send("holadesde reserva");
});
