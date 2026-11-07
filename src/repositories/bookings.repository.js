import { ServicesDAO } from "../dao/services.dao.js";
import { BookingsDAO } from "../dao/bookings.dao.js";


export class BookingRepository {
    constructor(serviceDao = new ServicesDAO(), bookingDao = new BookingsDAO()) {
        this.serviceDao = serviceDao;
        this.bookingDao = bookingDao;
    }

    async getById(id) {
        return await this.bookingDao.getById(id)
    }

    async create(data) {
        return await this.bookingDao.create(data);
    }

    async addServiceToBooking(bid, sid) {
        const requiredBooking = this.bookingDao.getById(bid);
        if (requiredBooking == null) throw new Error("el booking requerido no existe");
        const requiredService = this.serviceDao.getById(sid);
        if (requiredService == null) throw new Error("el servicio requerido no existe");

        return await this.bookingDao.addServiceToBooking(bid, sid);
    }
}