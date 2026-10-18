import { ServiceModel } from "../models/service.models.js";

// ServicesDAO contiene las operaciones CRUD que dependen
// específicamente de nuestra persistencia actual: base de datos MongoDB
export class ServicesDAO {


    // Esta operación recupera el conjunto completo de servicios
    // desde la fuente de datos.
    async getAll() {

        // readFile nos entrega texto porque estamos leyendo un archivo.
        const services = await ServiceModel.find()


// await ServiceModel.find()
// await ServiceModel.findById(id)
// await ServiceModel.create(data)
// await ServiceModel.findByIdAndUpdate(id, data, { new: true })
// await ServiceModel.findByIdAndDelete(id) 

        
        return services
    }


    async getById(id) {

        const service = await ServiceModel.findById(id)

        return service
    }


    async create(data) {

        const newService = await ServiceModel.create(data)


        return newService
    }


    async update(id, data) {

        const service = await ServiceModel.findByIdAndUpdate(id, data, {new: true})


        return service
    }


    async delete(id) {

        const service = await ServiceModel.findByIdAndDelete(id) 

        return service
    }
}
