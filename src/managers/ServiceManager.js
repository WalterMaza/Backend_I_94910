import { promises as fs } from "fs"

export default class ServiceManager {

    constructor(path) {
        this.path = path;
    }

    async readServices() {
        try {
            
             const data = await fs.readFile(this.path, "utf-8")
             return JSON.parse(data)

        } catch (error) {
            console.log("Error al leer servicios", error.message)
            return []
        }
    }

    async writeServices(services) {

        const json = JSON.stringify(services, null, 2)
        await fs.writeFile(this.path, json)
    }

}