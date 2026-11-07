import { BookingModel } from "../models/booking.model.js";

export class BookingsDAO {


    async getById(id) {
        const booking = await BookingModel.findById(id).populate("services.service")
        return booking
    }

    async create(data) {
        const newBooking = await BookingModel.create(data)
        return newBooking
    }

    async addServiceToBooking(bid, sid) {
        const booking = await BookingModel.findByIdAndUpdate(bid, { $push: { services: { service: sid } } })
        return booking
    }
}