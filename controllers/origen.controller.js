import { pool } from "../db.js";

export const getOrigin = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM origen");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getOriginById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM origen WHERE id_origen = ?",
      [req.params.id]
    );
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Origin Not Found",
      });
    res.json({
      body: rows
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createOrigin = async (req, res) => {
  const { depa_origen, distri_origen, estado, direc_origen } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO origen (depa_origen, distri_origen, estado, direc_origen) VALUES(?,?,?,?)",
      [depa_origen, distri_origen, estado, direc_origen]
    );
    res.json({
      message: "New Origin Created",
      body: [
        {
          id_origen: rows.insertId,
          depa_origen,
          distri_origen,
          estado,
          direc_origen,
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const updateOrigin = async (req, res) => {
  const { id } = req.params;
  const { depa_origen, distri_origen, estado, direc_origen } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE origen SET depa_origen = IFNULL(?, depa_origen), distri_origen = IFNULL(?, distri_origen), estado = IFNULL(?, estado), direc_origen = IFNULL(?, direc_origen) WHERE id_origen = ?",
      [depa_origen, distri_origen, estado, direc_origen, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Origin Not Found",
      });
    const [rows] = await pool.query(
      "SELECT * FROM origen WHERE id_origen = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteOrigin = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM origen WHERE id_origen = ?",
      [req.params.id]
    );
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Origin Not Found",
      });
    res.json({
      message: "Origin Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
