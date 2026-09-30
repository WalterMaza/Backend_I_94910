import express from "express";
import serviceRouter from "./routes/services.router.js";
import bookingRouter from "./routes/bookings.router.js";
const app = express();

// Middleware para poder recibir datos en el req.body
app.use(express.json());

app.use("/api/services", serviceRouter);
app.use("/api/bookings", bookingRouter);

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