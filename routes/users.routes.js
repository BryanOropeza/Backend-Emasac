import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserCotizacionesReservas
} from "../controllers/users.controller.js";

const router = Router();

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.get("/users-cot-resv/:id", getUserCotizacionesReservas);

router.post("/users", createUser);

router.post("/user-login", loginUser);

router.patch("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);


export default router;
