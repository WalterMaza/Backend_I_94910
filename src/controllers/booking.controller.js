import { BookingService } from "../services/bookings.service.js";

const bookingService = new BookingService();

export async function getById(req, res, next) {
    try {
        const { bid } = req.params;
        const requiredBooking = await bookingService.getById(bid);
        res.status(200).json({ message: "success", payload: requiredBooking });
    } catch (error) {
        next(error);
    }
}

export async function create(req, res, next) {
    try {
        const newBooking = await bookingService.create(req.body);
        res.status(200).json({ message: "success", payload: newBooking });
    } catch (error) {
        next(error);
    }
}

export async function addServiceToBooking(req, res, next) {
    try {
        const { sid, bid } = req.params;
        const addService = await bookingService.addServiceToBooking(bid, sid);
        res.status(200).json({ message: "success", payload: addService });
    } catch (error) {
        next(error);
    }
}