import { pool } from "../db.js";
import { transporter } from "../config.js";

export const getContact = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM contacto");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM contacto WHERE id_contacto = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Contact Not Found",
      });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createContact = async (req, res) => {
  const { nombre, apellido, correo, telefono, tipo_cont, mensaje } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO contacto (nombre, apellido, correo, telefono, tipo_cont, mensaje) VALUES(?,?,?,?,?,?)",
      [nombre, apellido, correo, telefono, tipo_cont, mensaje]
    );

    // Envío del correo al usuario
    const mailOptions = {
      from: 'bryan.oropeza16@gmail.com',
      to: correo,
      subject: 'Gracias por contactarnos',
      text: 'Tu mensaje ha sido recibido. Nos pondremos en contacto contigo pronto.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.json({
      message: "New Contact Created",
      body: [
        {
          id_contacto: rows.insertId,
          nombre,
          apellido,
          correo,
          telefono,
          tipo_cont,
          mensaje
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong", error
    });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, telefono, tipo_cont, mensaje } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE contacto SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), correo = IFNULL(?, correo), telefono = IFNULL(?, telefono), tipo_cont = IFNULL(?, tipo_cont), mensaje = IFNULL(?, mensaje) WHERE id_contacto = ?",
      [nombre, apellido, correo, telefono, tipo_cont, mensaje, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Contacto Not Found",
      });
    const [rows] = await pool.query("SELECT * FROM contacto WHERE id_contacto = ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM contacto WHERE id_contacto = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Contact Not Found",
      });
    res.json({
      message: "Contact Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
