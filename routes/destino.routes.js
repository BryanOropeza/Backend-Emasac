import { Router } from "express";
import {
  getDestino,
  getDestinoById,
  createDestino,
  updateDestino,
  deleteDestino,
} from "../controllers/destino.controller.js";

const router = Router();

router.get("/destino", getDestino);

router.get("/destino/:id", getDestinoById);

router.post("/destino", createDestino);

router.patch("/destino/:id", updateDestino);

router.delete("/destino/:id", deleteDestino);

export default router;
