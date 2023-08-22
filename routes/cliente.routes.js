import { Router } from "express";
import {
  getCliente,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../controllers/cliente.controller.js";

const router = Router();

router.get("/cliente", getCliente);

router.get("/cliente/:id", getClienteById);

router.post("/cliente", createCliente);

router.patch("/cliente/:id", updateCliente);

router.delete("/cliente/:id", deleteCliente);

export default router;
