import { ServicesRepository } from "../repositories/services.repository.js"

export class ServicesService {

    constructor(repository = new ServicesRepository()) {
        this.repository = repository
    }

    getServices(query) {
        // se toma la query y se crea el objeto de filtrado
        const filter = {
            // category: query.category ? query.category : "",
            // available: query.available ? query.available : ""
        }

        const pagination = {
            limit: query.limit,
            page: query.page
        }

        // revisar la validacion del filtrado
        return this.repository.getAll(filter, pagination)
    }

    async getServiceById(id) {
        const service = await this.repository.getById(id)
        if (!service) {
            throw new Error("Servicio no encontrado")
        }
        return service
    }

    async createService(data) {
        const { name, description, duration, price, category } = data
        if (!name || !description || !duration || price === undefined || !category) {
            throw new Error("Faltan campos obligatorios")
        }
        if (price < 0) {
            throw new Error("El precio no puede ser negativo")
        }
        return this.repository.create({
            name,
            description,
            duration,
            price,
            category
        })
    }

    async updateService(id, data) {
        const service = await this.repository.update(id, data)
        if (!service) {
            throw new Error("Servicio no encontrado")
        }
        return service
    }


    async deleteService(id) {
        const service = await this.repository.delete(id)
        if (!service) {
            throw new Error("Servicio no encontrado")
        }
        return service
    }
}
