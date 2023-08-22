import { Router } from "express";
import {
    getShipment,
    getShipmentById,
    createShipment,
    updateShipment,
    deleteShipment,
} from "../controllers/carga.controller.js"

const router = Router();

router.get("/carga", getShipment);

router.get("/carga/:id", getShipmentById);

router.post("/carga", createShipment);

router.patch("/carga/:id", updateShipment);

router.delete("/carga/:id", deleteShipment);

export default router;