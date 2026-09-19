import express from "express";
import ServiceManager from "./managers/ServiceManager.js";

const app = express();

// GET, POST, PUT, DELETE
const serviceManager = new ServiceManager();

app.use(express.json());

app.get("/",
    async (req, res, next) => {
        req.numero = 0;
        next();
    },
    async (req, res, next) => {
        req.numero += 1;
        next()
    },
    async (req, res, next) => {
        req.numero += 1;
        next()
    },
    async (req, res, next) => {
        try {
            const error = new Error("este error se va al ultimo middleware")
            throw error;
        } catch (error) {
            next(error);
        }
    },
    async (req, res, next) => {
        try {
            // res.json({ nombre: "Maxi", rol: "profesor" });
            // res.download("C:/Users/Noxie-PC/OneDrive/Escritorio/CoderHouse/back 1/94910/src/app.js");
            res.status(200).send(req.numero);
        } catch (error) {
            next(error);
        }
    });

app.get("/api/services", async (req, res) => {
    try {
        res.status(200).json(serviceManager.getServices());
    } catch (error) {
        next(error);
    }
});

app.get("/api/services/:id", async (req, res) => {
    try {
        const service = serviceManager.getServicesById(req.params.id)
        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
});

app.post("/api/services", async (req, res) => {
    try {
        const { name, description, price, available } = req.body;
        const newService = serviceManager.createService(name, description, price, available);
        res.status(201).json({ message: "nuevo turno generado", newService });
    } catch (error) {
        next(error);
    }
});

app.put("/api/services/:id", async (req, res) => {
    try {
        const updatedService = serviceManager.updateService(req.params.id, req.body);
        res.status(201).json({ message: "turno actualizado", updatedService });
    } catch (error) {
        next(error);
    }
});

app.delete("/api/services/:id", async (req, res) => {
    try {
        const deletedService = serviceManager.deleteService(req.params.id);
        res.status(201).json({ message: "turno eliminado", deletedService })
    } catch (error) {
        next(error);
    }
});

app.use(async (err, req, res, next) => {
    res.json(err.message)
});

app.listen(3000, () => {
    console.log("server andando en puerto 3000");
});