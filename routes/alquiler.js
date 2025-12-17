// routes/alquiler.js
import { Router } from "express";
import { alquileresUsuario, getAlquiler, createAlquiler,updateAlquiler } from "../controllers/alquilerController.js";


const router = Router();

router.get("/", getAlquiler);
router.post("/", createAlquiler);
router.put("/state/:id_alquiler", updateAlquiler);
router.get('/user/:cedula/', alquileresUsuario);
export default router;
