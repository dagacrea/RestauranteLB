import express from "express";
import { db } from "./db.js";
import {
  validarReserva,
  verificarValidacion,
  validarId,
} from "./validaciones.js";
import { validarJwt } from "./auth.js";

const router = express.Router();
//middleware para verificar datos de reserva
router.use(validarJwt);

router.get("/", async (req, res) => {
  const [reservas] = await db.execute("select * from reservas");
  res.send({ datos: reservas });
});

// ver reservas y nombres de clientes
router.get("/clientes", verificarValidacion, async (req, res) => {
  const sql =
    "SELECT r.id AS id_reserva,r.idmesa, r.fecha, r.fechaAReserv, c.nombre, c.apellido,  FROM reservas r JOIN clientes c ON r.idcliente = c.idcliente";

  const [reservas] = await db.execute(sql);

  res.send({ reservas });
});

router.get("/:id", validarId, verificarValidacion, async (req, res) => {
  const id = Number(req.params.id);

  const sql = "select * from reservas where idreserva=?";
  const [reservas] = await db.execute(sql, [id]);

  if (reservas.length === 0) {
    res.status(204).send({ mensaje: "no hay mesa con ese id" });
  } else {
    res.send({ reserva: reservas[0] });
  }
});

router.post(
  "/",

  validarReserva,
  verificarValidacion,

  async (req, res) => {
    const { idcliente, idmesa, fecha, fechaAReserv } = req.body;

    const [reservasExiste] = await db.execute(
      "select * from reservas where idmesa=? and fechaAReserv=?",
      [idmesa, fechaAReserv]
    );
    if (reservasExiste.length > 0) {
      res.status(400).send({ error: "Mesa ya reservada esta fecha" });
      return;
    }
    const [result] = await db.execute(
      " INSERT INTO reservas ( `idmesa`, `fecha`, `fechaAReserv`,`idcliente`) VALUES (?,?,?,?)",
      [idmesa, fecha, fechaAReserv, idcliente]
    );
    res.status(201).send({
      reserva: {
        id: result.insertId,

        idmesa,
        fecha,
        fechaAReserv,
        idcliente,
      },
    });
  }
);

router.put(
  "/:id",
  validarId,
  validarReserva,
  verificarValidacion,
  validarJwt,
  async (req, res) => {
    const id = number(req.params.id);
    const { idcliente, idmesa, fecha, fechaAReserv } = req.body;

    await db.execute(
      "update reservas set idcliente=?, idmesa=?,fecha=?,fechaAReserv=? where id=?"[
        (idcliente, idmesa, fecha, fechaAReserv, id)
      ]
    );
    res.send("Reserva modificada");
  }
);

router.delete(
  "/:id",
  validarId,
  verificarValidacion,
  validarJwt,
  async (req, res) => {
    const id = number(req.params.id);

    await db.execute("delete from reservas where id=?", [id]);
    res.send({ id });
  }
);

export default router;
