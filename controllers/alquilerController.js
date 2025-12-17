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

export const alquileresUsuario = async (req, res) => {
  const { cedula } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM alquiler WHERE cedula = $1',
      [cedula]
    );

    res.json(result.rows);

  } catch (err) {
    console.error('Error en getAlquileresPorCedula:', err);
    res.status(500).json({
      mensaje: 'Error obteniendo alquileres'
    });
  }
};

export const updateAlquiler = async (req, res) => {
  const { id_alquiler} = req.params;
  const { estado } = req.body;

  if (!estado) {
    return res.status(400).json({
      mensaje: 'El estado es obligatorio'
    });
  }

  try {
    const result = await pool.query(
      `UPDATE alquiler
       SET estado = $1
       WHERE id_alquiler = $2
       RETURNING *`,
      [estado, id_alquiler]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        mensaje: 'Alquiler no encontrado'
      });
    }

    res.json({
      mensaje: 'Alquiler actualizado',
      alquiler: result.rows[0]
    });

  } catch (err) {
    console.error('Error en updateAlquiler:', err);
    res.status(500).json({
      mensaje: 'Error actualizando alquiler'
    });
  }
};
