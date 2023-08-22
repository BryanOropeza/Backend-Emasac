/* import express from "express";
import cors from "cors"
import usersRoutes from "./routes/users.routes.js";
import indexRoutes from "./routes/index.routes.js";
import destinoRoutes from "./routes/destino.routes.js"
import origenRoutes from "./routes/origen.routes.js"
import reservaRoute from "./routes/reserva.routes.js"
import clientRouter from "./routes/cliente.routes.js"
import contactRoutes from "./routes/contacto.routes.js"
import cargaRoutes from "./routes/carga.routes.js"

import {PORT} from './config.js'

const app = express();

app.use(cors());

app.use(express.json());

app.use(indexRoutes);
app.use("/api", usersRoutes);
app.use("/api", destinoRoutes);
app.use("/api", origenRoutes);
app.use("/api", reservaRoute);
app.use("/api", clientRouter);
app.use("/api", cargaRoutes);
app.use("/api", contactRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

app.listen(PORT);
console.log('Server running on port', PORT);
 */


import express from "express";
import cors from "cors";
import path from "path"; // Importa la librería path para trabajar con rutas de archivos

import usersRoutes from "./routes/users.routes.js";
import indexRoutes from "./routes/index.routes.js";
import destinoRoutes from "./routes/destino.routes.js";
import origenRoutes from "./routes/origen.routes.js";
import reservaRoute from "./routes/reserva.routes.js";
import clientRouter from "./routes/cliente.routes.js";
import contactRoutes from "./routes/contacto.routes.js";
import cargaRoutes from "./routes/carga.routes.js";
import cotizacionRoutes from "./routes/cotizacion.routes.js";

import { PORT } from "./config.js";

const app = express();
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Configurar para servir archivos estáticos desde el frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(indexRoutes);
app.use("/api", usersRoutes);
app.use("/api", destinoRoutes);
app.use("/api", origenRoutes);
app.use("/api", reservaRoute);
app.use("/api", clientRouter);
app.use("/api", cargaRoutes);
app.use("/api", contactRoutes);
app.use("/api", cotizacionRoutes);

// Ruta para servir los archivos HTML desde la carpeta "views"
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
