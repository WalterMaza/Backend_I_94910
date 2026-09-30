import crypto from "crypto";
import fs from "fs/promises";

class BookingManager {
    constructor(path) {
        this.path = path;
    }

    async #readBookings() {
        const data = await fs.readFile(this.path, "utf-8");
        return JSON.parse(data); //transformamos de json a obj
    }

    async #writeBookings(booking) {
        fs.writeFile(this.path, JSON.stringify(booking, null, 2));
    }

    async getBookingsById(id) {
        const bookings = await this.#readBookings();
        return bookings.find(booking => booking.id === id);
    }

    // crea registro de turnos para un usuario
    async createBooking() {
        const booking = await this.#readBookings();
        const newBooking = {
            id: crypto.randomUUID(),
            services: [] //cada turno revservado va aca
        };
        booking.push(newBooking);
        await this.#writeBookings(booking);
        return newBooking;
    }

    // pensar el booking como un registro por usuario que almacena
    // los turnos tomados por esa persona
    async setServiceToBooking(sid, bid) {
        const booking = await this.getBookingsById(bid);
        booking.services.push({ service: sid });
    }
}

export default BookingManager;