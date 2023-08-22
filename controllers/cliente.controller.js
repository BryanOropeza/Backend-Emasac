import { pool } from "../db.js";

export const getCliente = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM cliente");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getClienteById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM cliente WHERE id_cliente = ?",
      [req.params.id]
    );
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Cliente Not Found",
      });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createCliente = async (req, res) => {
  const { nombre, razon_social, ruc, apellidos, correo, celular } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO cliente (nombre, razon_social, ruc, apellidos, correo, celular) VALUES(?,?,?,?,?,?)",
      [nombre, razon_social, ruc, apellidos, correo, celular]
    );
    res.json({
      message: "New Cliente Created",
      body: [
        {
          id_clientes: rows.insertId,
          nombre,
          razon_social,
          ruc,
          apellidos,
          correo,
          celular,

        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong", error
    });
  }
};

export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, razon_social, ruc, apellidos, correo, celular } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE cliente SET nombre = IFNULL(?, nombre), razon_social = IFNULL(?, razon_social), ruc = IFNULL(?, ruc), apellidos = IFNULL(?, apellidos), correo = IFNULL(?, correo), celular = IFNULL(?, celular), WHERE id_cliente = ?",
      [nombre, razon_social, ruc, apellidos, correo, celular, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Cliente Not Found",
      });
    const [rows] = await pool.query(
      "SELECT * FROM cliente WHERE id_cliente = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
    console.log(error);
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM cliente WHERE id_cliente = ?",
      [req.params.id]
    );
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Cliente Not Found",
      });
    res.json({
      message: "Cliente Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
