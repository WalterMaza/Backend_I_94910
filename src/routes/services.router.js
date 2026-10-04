import { Router } from "express"

import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from "../controllers/services.controller.js"


const router = Router()


// Router solamente relaciona método + URL con Controller.
// No contiene reglas del negocio ni acceso a archivos.
router.get("/", getServices)

router.get("/:sid", getServiceById)

router.post("/", createService)

router.put("/:sid", updateService)

router.delete("/:sid", deleteService)


export default router
