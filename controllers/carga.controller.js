import { pool } from "../db.js";

export const getShipment = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM carga");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getShipmentById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM carga WHERE id_carga = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Shipment Not Found",
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

export const createShipment = async (req, res) => {
  const { alto, ancho, largo, peso_cargo, tipo_mercaderia } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO carga (alto, ancho, largo, peso_cargo, tipo_mercaderia) VALUES(?,?,?,?,?)",
      [alto, ancho, largo, peso_cargo, tipo_mercaderia]
    );
    res.json({
      message: "New Shipment Created",
      body: [
        {
          id_carga: rows.insertId,
          alto,
          ancho,
          largo,
          peso_cargo,
          tipo_mercaderia,
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const updateShipment = async (req, res) => {
  const { id } = req.params;
  const { alto, ancho, largo, peso_cargo, tipo_mercaderia } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE carga SET alto = IFNULL(?, alto), ancho = IFNULL(?, ancho), largo = IFNULL(?, largo), peso_cargo = IFNULL(?, peso_cargo), tipo_mercaderia = IFNULL(?, tipo_mercaderia) WHERE id_carga = ?",
      [alto, ancho, largo, peso_cargo, tipo_mercaderia, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Shipment Not Found",
      });
    const [rows] = await pool.query("SELECT * FROM carga WHERE id_carga = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteShipment = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM carga WHERE id_carga = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Shipment Not Found",
      });
    res.json({
      message: "Shipment Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
