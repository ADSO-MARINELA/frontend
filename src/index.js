import server from "./server.js"; // Importa la instancia del servidor desde el módulo 'server.js'

// Configura el servidor para escuchar en el puerto especificado
const PORT = server.get("port");
server.listen(PORT, () => {
    console.log(`Ejecutandose en el puerto http://localhost:${PORT}`);
});
