import { Router } from "express";
import {
    getCotizacion,
    getCotizacionById,
    createCotizacion,
    updateCotizacion,
    deleteCotizacion,
} from "../controllers/cotizacion.controller.js";

const router = Router();

router.get("/cotizacion", getCotizacion);
router.get("/cotizacion/:id", getCotizacionById);
router.post("/cotizacion", createCotizacion);
router.patch("cotizacion/:id", updateCotizacion);
router.patch("/delete-cotizacion/:id", deleteCotizacion);

export default router;

