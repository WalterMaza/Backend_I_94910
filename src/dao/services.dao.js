// Utilizamos la versión basada en Promesas del módulo FileSystem
// porque nuestras lecturas y escrituras son operaciones de entrada/salida
// que debemos esperar antes de continuar trabajando con los datos.
import fs from "fs/promises"

// Generaremos IDs independientes de la posición del elemento en el array.
// De esta manera borrar elementos no altera ni reutiliza identificadores.
import crypto from "crypto"


// Guardamos la ubicación del archivo en un único punto.
// Todos los métodos del DAO utilizarán esta misma fuente de datos.
const PATH = "./src/data/services.json"


// ServicesDAO contiene las operaciones CRUD que dependen
// específicamente de nuestra persistencia actual: un archivo JSON.
export class ServicesDAO {


    // Esta operación recupera el conjunto completo de servicios
    // desde la fuente de datos.
    async getAll() {

        // readFile nos entrega texto porque estamos leyendo un archivo.
        const data = await fs.readFile(PATH, "utf-8")

        // Convertimos ese texto JSON en un array JavaScript
        // para poder buscar, agregar, editar o eliminar elementos.
        return JSON.parse(data)
    }


    async getById(id) {

        const services = await this.getAll()

        // DAO se limita a buscar.
        // Si no encuentra nada devuelve null;
        // no decide todavía qué significado tiene eso para la aplicación.
        return services.find(service => service.id === id) || null
    }


    async create(data) {

        const services = await this.getAll()


        // Creamos el objeto que finalmente quedará persistido.
        // El DAO agrega el dato técnico que necesita el registro: su ID.
        const newService = {
            id: crypto.randomUUID(),
            ...data
        }


        services.push(newService)


        // Persistimos el nuevo estado completo del array.
        await fs.writeFile(
            PATH,
            JSON.stringify(services, null, 2)
        )


        return newService
    }


    async update(id, data) {

        const services = await this.getAll()


        // findIndex nos interesa porque para actualizar necesitamos
        // conocer la posición exacta del elemento dentro del array.
        const index = services.findIndex(service => service.id === id)


        // -1 significa que findIndex no encontró ninguna coincidencia.
        // El DAO devuelve null y deja que una capa superior
        // decida cómo interpretar ese resultado.
        if (index === -1) {
            return null
        }


        // Conservamos las propiedades existentes y sobrescribimos
        // únicamente aquellas que vienen en data.
        //
        // Dejamos id al final para impedir que una actualización
        // pueda reemplazar accidentalmente el identificador original.
        services[index] = {
            ...services[index],
            ...data,
            id
        }


        await fs.writeFile(
            PATH,
            JSON.stringify(services, null, 2)
        )


        return services[index]
    }


    async delete(id) {

        const services = await this.getAll()


        // Primero obtenemos el recurso porque queremos poder devolverlo
        // después de eliminarlo.
        const service = services.find(service => service.id === id)


        if (!service) {
            return null
        }


        // filter construye un nuevo array dejando afuera
        // solamente el elemento cuyo ID queremos eliminar.
        const filteredServices = services.filter(
            service => service.id !== id
        )


        await fs.writeFile(
            PATH,
            JSON.stringify(filteredServices, null, 2)
        )


        return service
    }
}
