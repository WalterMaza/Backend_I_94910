// El Service trabaja con operaciones de datos,
// pero no necesita conocer cómo se ejecutan técnicamente.
//
// Por eso depende del Repository.
import { ServicesRepository } from "../repositories/services.repository.js"


// Acá concentramos las reglas relacionadas con el recurso Service.
export class ServicesService {


    constructor(repository = new ServicesRepository()) {
        this.repository = repository
    }


    // No agregamos ninguna regla especial para listar,
    // así que delegamos directamente la consulta.
    getServices() {
        return this.repository.getAll()
    }


    async getServiceById(id) {

        const service = await this.repository.getById(id)


        // El Repository devuelve datos.
        // El Service interpreta esos datos según el comportamiento
        // esperado por nuestra aplicación.
        if (!service) {
            throw new Error("Servicio no encontrado")
        }


        return service
    }


    async createService(data) {

        const { name, description, duration, price, category } = data


        // Esta validación pertenece acá porque define
        // qué consideramos un servicio válido.
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

        // La capa de negocio solicita la modificación.
        // No sabe si debajo se modifica un JSON o un documento MongoDB.
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
