import express from "express";
import { engine } from "express-handlebars";
import serviceRouter from "./routes/services.router.js";
import bookingRouter from "./routes/bookings.router.js";
import viewsRouter from "./routes/views.router.js";

import __dirname from "./utils.js";
const app = express();

// Middleware para poder recibir datos en el req.body
app.use(express.json());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.engine("handlebars", engine());
app.use(express.static(__dirname + "/public"));

app.use("/api/services", serviceRouter);
app.use("/api/bookings", bookingRouter);

app.use("/", viewsRouter);

// Ruta principal
app.get("/", (req, res) => {

    res.status(200).json({
        status: "success",
        message: "API del Sistema de Turnos y Reservas"
    });
});

app.use((req, res, next) => {
    res.status(404).send("la pagina solicitada no existe");
});
// Exportamos la configuración de la app
export default app;