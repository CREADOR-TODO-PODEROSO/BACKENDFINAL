// controllers/usuariosController.js
import jwt from 'jsonwebtoken';
import { pool } from "../db.js";

export const loginUsuario = async (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({
            mensaje: 'Correo y password son obligatorios'
        });
    }

    try {
        const result = await pool.query(
            'SELECT cedula, nombre, correo, numero_licencia FROM usuarios WHERE correo = $1 AND password = $2',
            [correo, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas'
            });
        }

        const usuario = result.rows[0];

        // TOKEN SIMPLE
        const token = jwt.sign(
            {
                cedula: usuario.cedula,
                correo: usuario.correo,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            mensaje: 'Login exitoso',
            usuario,
            token
        });

    } catch (err) {
        console.error('Error en loginUsuario:', err);
        res.status(500).json({ mensaje: 'Error en login' });
    }
};


export const getUsuarios = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM usuarios");
        res.json(result.rows);
    } catch (err) {
        console.error("Error en getUsuarios:", err);
        res.status(500).json({ error: "Error obteniendo usuarios" });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const { cedula, nombre, fecha_nacimiento, numero_licencia, direccion, telefono } = req.body;

        const query = `
            INSERT INTO usuarios (cedula, nombre, fecha_nacimiento, numero_licencia, direccion, telefono)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        const values = [cedula, nombre, fecha_nacimiento, numero_licencia, direccion, telefono];

        const result = await pool.query(query, values);
        res.json({ message: "Usuario creado", data: result.rows[0] });

    } catch (err) {
        console.error("Error en createUsuario:", err);
        res.status(500).json({ error: "Error creando usuario" });
    }
};
