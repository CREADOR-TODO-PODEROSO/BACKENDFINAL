// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";

import usuariosRoutes from "./routes/usuarios.js";
import autosRoutes from "./routes/autos.js";
import alquilerRoutes from "./routes/alquiler.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // LOGS de cada petición

// Rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/autos", autosRoutes);
app.use("/api/alquiler", alquilerRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
