import http from "http";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;


// ============================================================
// CREACIÓN DEL SERVIDOR
// ============================================================

// Creamos el servidor HTTP.
// Node.js nos proporciona los objetos req y res:
// - req → contiene información sobre la petición recibida
// - res → nos permite construir y enviar la respuesta
const server = http.createServer((req, res) => {


    console.log(`Petición recibida: ${req.method} de la ruta ${req.url}`);


    // ========================================================
    // RUTA /
    // ========================================================

    // Si desde el frontend nos llega una petición GET a la ruta /
    // se ejecuta este bloque porque coinciden el método y la ruta.
    //
    // En este caso respondemos:
    // - Status Code: 200
    // - Content-Type: text/plain
    // - Body: "Hola Mundo"

    if (req.url === "/" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Hola Mundo");

        return;
    }


    // ========================================================
    // RUTA /usuarios
    // ========================================================

    // Si llega una petición GET a la ruta /usuarios,
    // se ejecuta este bloque porque coinciden el método y la ruta.
    //
    // En este caso respondemos:
    // - Status Code: 200
    // - Content-Type: application/json
    // - Body: un array de usuarios en formato JSON

    if (req.url === "/usuarios" && req.method === "GET") {


        // Array con datos de usuarios que simula una base de datos.
        //
        // En próximas clases podemos almacenar estos datos
        // en archivos y posteriormente utilizar una base de datos.

        const usuarios = [
            { id: 1, nombre: "Juan" },
            { id: 2, nombre: "Ana" },
            { id: 3, nombre: "Ariel" }
        ];


        res.writeHead(200, {
            "Content-Type": "application/json"
        });


        // JSON.stringify() convierte el array de JavaScript
        // en un string con formato JSON.
        //
        // Esto nos permite enviar los datos como contenido
        // de una respuesta HTTP.

        res.end(JSON.stringify(usuarios));


        return;
    }


    // ========================================================
    // RUTA NO ENCONTRADA
    // ========================================================

    // Si la petición no coincidió con ninguna de las rutas
    // anteriores, respondemos con un error 404.

    res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8"
    });

    res.end("Ruta no encontrada");

});


// ============================================================
// INICIAMOS EL SERVIDOR
// ============================================================
server.listen(PORT, () => {

    console.log(`Servidor escuchando en http://localhost:${PORT}`);

});
