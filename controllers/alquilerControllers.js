// controllers/alquilerController.js
import { pool } from "../db.js";

export const getAlquiler = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM alquiler");
        res.json(result.rows);
    } catch (err) {
        console.error("Error en getAlquiler:", err);
        res.status(500).json({ error: "Error obteniendo alquileres" });
    }
};

export const createAlquiler = async (req, res) => {
    try {
        const { cedula, placa, fecha_inicio, fecha_fin, costo_total, estado } = req.body;

        const query = `
            INSERT INTO alquiler (cedula, placa, fecha_inicio, fecha_fin, costo_total, estado)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        const values = [cedula, placa, fecha_inicio, fecha_fin, costo_total, estado];

        const result = await pool.query(query, values);
        res.json({ message: "Alquiler creado", data: result.rows[0] });

    } catch (err) {
        console.error("Error en createAlquiler:", err);
        res.status(500).json({ error: "Error creando alquiler" });
    }
};