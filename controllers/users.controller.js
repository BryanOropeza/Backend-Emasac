import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: "User Not Found",
      });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createUser = async (req, res) => {
  const { username, password, id_cliente } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO users (username, password, id_cliente) VALUES(?,?,?)",
      [username, password, id_cliente]
    );
    res.json({
      message: "New User Created",
      body: [
        {
          id: rows.insertId,
          username,
          password,
          id_cliente
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, id_cliente } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE users SET username = IFNULL(?, username), password = IFNULL(?, password), id_cliente = IFNULL(?, id_cliente) WHERE id_users = ?",
      [username, password, id, id_cliente]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "User Not Found",
      });
    const [rows] = await pool.query("SELECT * FROM users WHERE id_users = ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id_users = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "User Not Found",
      });
    res.json({
      message: "User Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};


export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Buscar en la base de datos un usuario con el nombre de usuario proporcionado
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

    // Verificar si se encontró un usuario con el nombre de usuario proporcionado
    if (rows.length === 0) {
      return res.status(401).json({
        message: "Nombre de usuario o contraseña incorrectos",
      });
    }

    // Verificar si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
    if (rows[0].password !== password) {
      return res.status(401).json({
        message: "Nombre de usuario o contraseña incorrectos",
      });
    }

    // Si las credenciales son válidas, devolver una respuesta exitosa
    res.json({
      message: "Inicio de sesión exitoso",
      user: {
        id: rows[0].id,
        username: rows[0].username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo salió mal",
    });
  }
};

export const getUserCotizacionesReservas = async (req, res) => {
  try {
    const userId = req.params.id;

    // Consulta las cotizaciones relacionadas con el userId
    const cotizaciones = await pool.query(
      "SELECT * FROM cotizacion WHERE id = ? AND estado = 'Activo'",
      [userId]
    );

    // Consulta las reservas relacionadas con el userId
    const reservas = await pool.query(
      "SELECT * FROM reserva WHERE id = ? AND estado = 'Activo'",
      [userId]
    );
    res.json({
      cotizaciones: cotizaciones[0],
      reservas: reservas[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las cotizaciones y reservas del usuario",
    });
  }
};
