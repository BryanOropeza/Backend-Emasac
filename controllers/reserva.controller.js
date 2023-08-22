import { pool } from "../db.js";

export const getReservation = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM reserva");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getReservationById = async (req, res) => {
  try {
    console.log(req.params.id)
    const [rows] = await pool.query(
      "SELECT * FROM reserva WHERE id_reserva = ?",
      [req.params.id]
    );
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Reservation Not Found",
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

export const createReservation = async (req, res) => {
  const {
    tipo_transporte,
    precio,
    id_origen,
    id_destino,
    id,
    id_carga,
    id_cotizacion
  } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO reserva (tipo_transporte, precio, id_origen, id_destino, id, id_carga, id_cotizacion) VALUES(?,?,?,?,?,?,?)",
      [
        tipo_transporte,
        precio,
        id_origen,
        id_destino,
        id,
        id_carga,
        id_cotizacion,
      ]
    );
    res.json({
      message: "New Reservation Created",
      body: [
        {
          id_reserva: rows.insertId,
          tipo_transporte,
          precio,
          id_origen,
          id_destino,
          id,
          id_carga,
          id_cotizacion,
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
    });
  }
};

export const updateReservation = async (req, res) => {
  const { id_reserva } = req.params;
  const {
    tipo_transporte,
    precio,
    estado,
    id_origen,
    id_destino,
    id,
    id_carga,
    id_cotizacion
  } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE reserva SET tipo_transporte = IFNULL(?, tipo_transporte), precio = IFNULL(?, precio), estado = IFNULL(?, estado), id_origen = IFNULL(?, id_origen), id_destino = IFNULL(?, id_destino), id = IFNULL(?, id), id_carga = IFNULL(?, id_carga), id_cotizacion = IFNULL(?, id_cotizacion) WHERE id_reserva = ?",
      [
        tipo_transporte,
        precio,
        estado,
        id_origen,
        id_destino,
        id,
        id_carga,
        id_cotizacion,
      ]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Rerservation Not Found",
      });
    const [rows] = await pool.query(
      "SELECT * FROM reserva WHERE id_reserva = ?",
      [id_reserva]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE reserva SET estado = 'Eliminado' WHERE id_reserva = ?",
      [req.params.id]
    );
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Rerservation Not Found",
      });
    res.json({
      message: "Reservation Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
