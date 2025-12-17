// controllers/autosController.js
import { pool } from "../db.js";

export const getAutos = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM autos");
        res.json(result.rows);
    } catch (err) {
        console.error("Error en getAutos:", err);
        res.status(500).json({ error: "Error obteniendo autos" });
    }
};

export const createAuto = async (req, res) => {
    try {
        const { placa, image, modelo, color, ano, costo, estado, valor } = req.body;

        const query = `
            INSERT INTO autos (placa, image, modelo, color, ano, costo, estado, valor)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

        const values = [placa, image, modelo, color, ano, costo, estado, valor];
        const result = await pool.query(query, values);
        res.json({ message: "Auto registrado", data: result.rows[0] });

    } catch (err) {
        console.error("Error en createAuto:", err);
        res.status(500).json({ error: "Error creando auto" });
    }
};
