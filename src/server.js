import { envConfig } from "./config/env.config.js"
import { Server } from "socket.io";
import app from "./app.js";

import { connectDB } from "./config/database.config.js";


const httpServer = app.listen(envConfig.port, async () => {
    await connectDB()
    console.log(`Servidor corriendo en http://localhost:${envConfig.port}`);
});

export const socketServer = new Server(httpServer);

socketServer.on("connection", (socketClient) => {
    console.log("Nuevo cliente conectado");
});
