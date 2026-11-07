import { Router } from "express";
import { getById, addServiceToBooking, create } from "../controllers/booking.controller.js";

const router = Router();

router.get("/:bid", getById);
router.post("/", create);
router.post("/:bid/services/:sid", addServiceToBooking);

export default router;