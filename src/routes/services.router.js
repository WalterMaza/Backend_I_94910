import { Router } from "express";
import ServiceController from "../controllers/services.controller.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { validateUUID } from "../middlewares/services.middlewares.js";

const router = Router();

// cambiar luego a validacion de ObjectID cuando veamos MongoDB
router.param("sid", validateUUID);

// router.route("/")
//     .get(ServiceController.getAllServices)
//     .post(ServiceController.createService)

// router.route("/:sid")
//     .get(ServiceController.getServiceById)
//     .put(ServiceController.updateServiceById)
//     .delete(ServiceController.deleteServiceById)

router.get("/", ServiceController.getAllServices);
router.get("/:sid", ServiceController.getServiceById);
router.post("/", ServiceController.createService);
router.put("/:sid", ServiceController.updateServiceById);
router.delete("/:sid", ServiceController.deleteServiceById);

router.use(errorHandler);
export default router;