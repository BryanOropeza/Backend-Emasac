import { pool } from "../db.js";

export const getDestino = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM destino");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getDestinoById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM destino WHERE id_destino = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Destino Not Found",
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

export const createDestino = async (req, res) => {
  const { depa_destino, distri_destino, direc_destino } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO destino (depa_destino, distri_destino, direc_destino) VALUES(?,?,?)",
      [depa_destino, distri_destino, direc_destino]
    );
    res.json({
      message: "New Destino Created",
      body: [
        {
          id_destino: rows.insertId,
          depa_destino,
          distri_destino,
          direc_destino
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
    console.log(error);
  }
};

export const updateDestino = async (req, res) => {
  const { id } = req.params;
  const { depa_destino, distri_destino, direc_destino } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE destino SET depa_destino = IFNULL(?, depa_destino), distri_destino = IFNULL(?, distri_destino), direc_destino = IFNULL(?, direc_destino) WHERE id_destino = ?",
      [depa_destino, distri_destino, direc_destino, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Destino Not Found",
      });
    const [rows] = await pool.query("SELECT * FROM destino WHERE id_destino = ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteDestino = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM destino WHERE id_destino = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Destino Not Found",
      });
    res.json({
      message: "Destino Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
