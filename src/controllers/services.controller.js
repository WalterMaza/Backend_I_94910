// A partir de este refactor el Controller ya no llama directamente
// al Manager ni conoce FileSystem.
//
// Su única dependencia para ejecutar los casos de uso será el Service.
import { socketServer } from "../server.js"
import { ServicesService } from "../services/services.service.js"


const servicesService = new ServicesService()
/**
 * 
 * @param {import("express").Request} req 
 * @param {*} res 
 * @returns 
 */
export const getServices = async (req, res) => {

    try {
        const services = await servicesService.getServices(req.query)

        console.log(services);

        return res.status(200).json({
            status: "success",
            payload: services
        })

    } catch (error) {

        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}


export const getServiceById = async (req, res) => {

    try {

        // req.params.sid existe porque en el Router
        // definimos una parte dinámica de la URL como :sid.
        const service = await servicesService.getServiceById(
            req.params.sid
        )


        return res.status(200).json({
            status: "success",
            payload: service
        })

    } catch (error) {

        return res.status(404).json({
            status: "error",
            message: error.message
        })
    }
}


export const createService = async (req, res) => {

    try {

        // El Controller traduce HTTP → datos de aplicación.
        //
        // Le entrega req.body al Service,
        // pero el Service nunca necesita conocer req.
        const service = await servicesService.createService(req.body)


        return res.status(201).json({
            status: "success",
            payload: service
        })

    } catch (error) {

        return res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}


export const updateService = async (req, res) => {

    try {

        // El ID llega desde la URL y los cambios desde el body.
        //
        // El Controller extrae ambas cosas del protocolo HTTP
        // y se las pasa al Service como valores normales.
        const service = await servicesService.updateService(
            req.params.sid,
            req.body
        )


        return res.status(200).json({
            status: "success",
            payload: service
        })

    } catch (error) {

        return res.status(404).json({
            status: "error",
            message: error.message
        })
    }
}


export const deleteService = async (req, res) => {

    try {

        const service = await servicesService.deleteService(
            req.params.sid
        )
            .then(data => {
                socketServer.emit("delete-service", data)
            })


        return res.status(200).json({
            status: "success",
            payload: service
        })

    } catch (error) {

        return res.status(404).json({
            status: "error",
            message: error.message
        })
    }
}
