import { BookingRepository } from "../repositories/bookings.repository.js";

export class BookingService {
    constructor(repository = new BookingRepository()) {
        this.repository = repository;
    }

    async getById(id) {
        return await this.repository.getById(id)
    }

    async create(data) {
        return await this.repository.create(data);
    }

    async addServiceToBooking(bid, sid) {
        return await this.repository.addServiceToBooking(bid, sid);
    }
}