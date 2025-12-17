// routes/autos.js de routes
import { Router } from "express";
import { getAutos, createAuto } from "../controllers/autosController.js";

const router = Router();

router.get("/", getAutos);
router.post("/", createAuto);




export default router;