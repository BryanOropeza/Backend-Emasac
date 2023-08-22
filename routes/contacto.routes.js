import { Router } from "express";

import {
    getContact,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
} from "../controllers/contacto.controller.js";

const router = Router();

router.get("/contacto", getContact);

router.get("/contacto/:id", getContactById);

router.post("/contacto", createContact);

router.patch("/contacto/:id", updateContact);

router.delete("/contacto/:id", deleteContact);

export default router;
