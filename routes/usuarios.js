// routes/usuarios.js
import { Router } from "express";
import {
    loginUsuario,
    getUsuarios,
    createUsuario
} from "../controllers/usuariosController.js";

const router = Router();

router.post("/login/", loginUsuario);
router.get("/", getUsuarios);
router.post("/", createUsuario);

export default router;
