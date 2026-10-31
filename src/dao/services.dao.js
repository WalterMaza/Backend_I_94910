import { ServiceModel } from "../models/service.models.js";

export class ServicesDAO {

    async getAll(filter = {}, pagination = { limit: 5, page: 1 }) {
        // $lt = lower than (mas pequeño que X)
        // $lte = lower than equal (mas pequeño o igual a X)
        // $gt
        // $gte

        // const services = await ServiceModel.find().lean() //5000 elementos para filtrar
        // entra la coleccion completa a la RAM

        // { category: "Peluquería", price: { $lte: 9000 } }
        // const services = await ServiceModel.find(filter)
        // .sort({ price: "desc" })
        // .lean()//50 elementos ya filtrados

        const services = await ServiceModel.paginate(filter, { ...pagination, lean: true })
        // const services = await ServiceModel.find({ category: "Peluquería", price: { $lte: 9000 } }).sort({ price: "desc" })
        // la RAM está más libre
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
        const service = await ServiceModel.findByIdAndUpdate(id, data, { new: true })
        return service
    }

    async delete(id) {
        const service = await ServiceModel.findByIdAndDelete(id)
        return service
    }
}