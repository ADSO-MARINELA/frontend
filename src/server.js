// Importa los módulos necesarios
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Configura Express
const server = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Servir archivos estáticos (CSS, JS, y HTML)
server.use(express.static(path.join(__dirname, "/public")));

// Ruta principal para servir el archivo HTML principal
server.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/login.html"))
);

server.get("/registro", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/registro.html"))
);

server.get("/dashboard", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/dashboard.html"))
);

server.get("/clientes", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/clientes.html"))
);

server.get("/horariose", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/horariose.html"))
);

server.get("/Horariosp", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/Horariosp.html"))
);

server.get("/ordenes", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/ordenes.html"))
);

server.get("/personal", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/personal.html"))
);

server.get("/platos", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/platos.html"))
);

server.get("/quincena", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/quincena.html"))
);

server.get("/ventas", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/ventas.html"))
);

// Configura el puerto
server.set("port", process.env.PORT || 4000);

export default server;
