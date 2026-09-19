import express from "express";
import ServiceManager from "./managers/ServiceManager.js";

const app = express();

// Middleware para poder recibir datos en el req.body
app.use(express.json())

const serviceManager = new ServiceManager("./src/data/services.json")

// Datos
// const services = [
//     {
//         id: 1,
//         name: "Consulta médica general",
//         duration: 30,
//         price: 12000,
//         category: "salud",
//         available: true
//     },
//     {
//         id: 2,
//         name: "Sesión de fisioterapia",
//         duration: 45,
//         price: 15000,
//         category: "rehabilitación",
//         available: true
//     }
// ];

// Ruta principal
app.get("/", (req, res) => {

    res.status(200).json({
        status: "success",
        message: "API del Sistema de Turnos y Reservas"
    });
});

// req.query sirve para capturar parámetros de consulta (query parameters) de la URL
// ejemplo: /api/services?category=salud
app.get("/api/services", async(req, res) => {

    const { category } = req.query

    const services =  await serviceManager.readServices()

    let filteredServices = services

    if (category) {
        filteredServices = services.filter(service => service.category === category)
    }

    res.status(200).json({
        status: "success",
        payload: filteredServices
    });
});

// req.params sirven para capturar valores dinámicos de la ruta
// ejemplo: /api/services/1
app.get("/api/services/:sid", async (req, res) => {
    const { sid } = req.params;

    const services = await serviceManager.readServices()
    
    const service = services.find(service => service.id === parseInt(sid));

    if (!service) {
        return res.status(404).json({
            status: "error",
            message: "Servicio no encontrado"
        });
    }
    res.status(200).json({
        status: "success",
        payload: service
    });
});

// req.body sirve para capturar datos enviados en el cuerpo de la petición
app.post("/api/services", async (req, res) => {
    const { name, duration, price, category, available } = req.body

    if (!name || !duration || !price || !category || available === undefined) {
        return res.status(400).json({
            status: "error",
            message: "Faltan campos obligatorios"
        });
    }

    const services = await serviceManager.readServices()

    const newService = {
        id: services.length + 1,
        name,
        duration,
        price,
        category,
        available
    };

    services.push(newService)

    console.log("services ---> ", services)

    await serviceManager.writeServices(services)
    
    res.status(201).json({
        status: "success",
        payload: newService
    });
});

// Actualizar un servicio identificado por su id (sid, service id)
app.put("/api/services/:sid", async (req, res) => {
    const { sid } = req.params;

    const services = await serviceManager.readServices()

    const serviceIndex = services.findIndex(service => service.id === parseInt(sid));

    if (serviceIndex === -1) {
        return res.status(404).json({
            status: "error",
            message: "Servicio no encontrado"
        });
    }

    const updateService = {
        ...services[serviceIndex],
        ...req.body,
        id: parseInt(sid)
    }

    services[serviceIndex] = updateService

    await serviceManager.writeServices(services)

    res.status(200).json({
        status: "success",
        payload: updateService
    });
});

// Eliminar un servicio identificado por su id (sid, service id)
app.delete("/api/services/:sid", async (req, res) => {
    
    const { sid } = req.params;

    const services = await serviceManager.readServices()
    
    const serviceIndex = services.findIndex(service => service.id === parseInt(sid))

    if (serviceIndex === -1) {
        return res.status(404).json({
            status: "error",
            message: "Servicio no encontrado"
        });
    }
    
    services.splice(serviceIndex, 1)

    await serviceManager.writeServices(services)
    
    res.status(200).json({
        status: "success",
        message: "Servicio eliminado"
    });

});

// Exportamos la configuración de la app
export default app;