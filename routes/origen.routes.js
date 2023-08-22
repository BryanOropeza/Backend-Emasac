import { Router } from "express";
import {
  getOrigin,
  getOriginById,
  createOrigin,
  updateOrigin,
  deleteOrigin,
} from "../controllers/origen.controller.js";

const router = Router();

router.get("/origen", getOrigin);

router.get("/origen/:id", getOriginById);

router.post("/origen", createOrigin);

router.patch("/origen/:id", updateOrigin);

router.delete("/origen/:id", deleteOrigin);

export default router;
