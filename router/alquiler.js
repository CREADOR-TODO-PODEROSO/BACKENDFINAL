// routes/alquiler.js
import { Router } from "express";
import { getAlquiler, createAlquiler } from "../controllers/alquilerController.js";

const router = Router();

router.get("/", getAlquiler);
router.post("/", createAlquiler);

export default router;