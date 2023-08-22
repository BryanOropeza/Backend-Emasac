import { Router } from "express";
import {
  getReservation,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../controllers/reserva.controller.js";

const router = Router();

router.get("/reserva", getReservation);

router.get("/reserva/:id", getReservationById);

router.post("/reserva", createReservation);

router.patch("/reserva/:id", updateReservation);

router.patch("/deletereserva/:id", deleteReservation);

export default router;
