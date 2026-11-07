import { Router } from "express"

import { validateBody } from "../middlewares/validate.js"

import { createServiceSchema, updateServiceSchema } from "../validations/service.validations.js"

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

router.post("/", validateBody(createServiceSchema) ,createService)

router.put("/:sid", validateBody(updateServiceSchema), updateService)

router.delete("/:sid", deleteService)


export default router
