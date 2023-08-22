import { pool } from "../db.js";

export const getCotizacion = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM cotizacion");
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong" + error,
        });
    }
};

export const getCotizacionById = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM cotizacion WHERE id_cotizacion = ?", [
            req.params.id,
        ]);
        if (rows.length <= 0)
            return res.status(404).json({
                message: "Cotizacion Not Found",
            });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const createCotizacion = async (req, res) => {
    const { precio_cot, id } = req.body;
    try {
        const [rows] = await pool.query(
            "INSERT INTO cotizacion (precio_cot, id ) VALUES(?,?)",
            [precio_cot, id]
        );
        res.json({
            message: "Nueva cotizacion creada",
            body:
            {
                id_cotizacion: rows.insertId,
                precio_cot,
                id
            },

        });
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong", error
        });
    }
};

export const updateCotizacion = async (req, res) => {
    const { id_cotizacion } = req.params;
    const { precio_cot, id } = req.body;
    try {
        const [result] = await pool.query(
            "UPDATE cotizacion SET precio_cot = IFNULL(?, precio_cot), id = IFNULL(?, id) WHERE id_cotizacion = ?",
            [precio_cot, id]
        );
        if (result.affectedRows === 0)
            return res.status(404).json({
                message: "User Not Found",
            });
        const [rows] = await pool.query("SELECT * FROM cotizacion WHERE id_cotizacion = ?", [id_cotizacion]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const deleteCotizacion = async (req, res) => {
    try {
        const [result] = await pool.query("UPDATE cotizacion SET estado = 'Eliminado' WHERE id_cotizacion = ?", [
            req.params.id,
        ]);
        if (result.affectedRows <= 0)
            return res.status(404).json({
                message: "Cotizacion Not Found",
            });
        res.json({
            message: "Cotización Deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

