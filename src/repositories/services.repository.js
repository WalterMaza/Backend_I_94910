// El Repository utiliza el DAO actual,
// pero la capa Service no necesita conocer esta implementación.
import { ServicesDAO } from "../dao/services.dao.js"


// ServicesRepository define las operaciones de datos
// que podrá solicitar nuestra lógica de negocio.
export class ServicesRepository {


    // Recibimos el DAO como dependencia para no fijar
    // toda la clase a una única implementación de persistencia.
    constructor(dao = new ServicesDAO()) {
        this.dao = dao
    }


    getAll() {
        return this.dao.getAll()
    }


    getById(id) {
        return this.dao.getById(id)
    }


    create(data) {
        return this.dao.create(data)
    }


    update(id, data) {
        return this.dao.update(id, data)
    }


    delete(id) {
        return this.dao.delete(id)
    }
}
