import ServiceManager from "../managers/ServiceManager.js"

const serviceManager = new ServiceManager("./src/data/services.json")

class ServiceController {
    static async getAllServices(req, res, next) {
        try {
            const { category } = req.query

            const services = await serviceManager.getServices()

            let filteredServices = services

            if (category) {
                filteredServices = services.filter(service => service.category === category)
            }

            res.status(200).json({
                status: "success",
                payload: filteredServices
            });
        } catch (error) {
            next(error);
        }
    }

    static async getServiceById(req, res, next) {

        try {
            const { sid } = req.params;

            const service = await serviceManager.getServicesById(sid);

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
        } catch (error) {
            next(error);
        }
    }

    static async createService(req, res, next) {
        try {
            const { name, duration, price, category, available } = req.body

            if (!name || !duration || !price || !category || available === undefined) {
                throw new Error("Faltan campos obligatorios")
            }

            const newService = await serviceManager.createService(name, duration, price, category, available)

            res.status(201).json({
                status: "success",
                payload: newService
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateServiceById(req, res, next) {
        try {
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
        } catch (error) {
            next(error);
        }

    }

    static async deleteServiceById(req, res, next) {

        try {
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

        } catch (error) {
            next(error);
        }
    }
}

export default ServiceController;