import crypto from "crypto";

class ServiceManager {

    services = []
    constructor() {
        this.services = [];
    }

    getServices() {
        return this.services;
    }

    getServicesById(id) {
        return this.services.find(service => service.id === id);
    }

    createService(name, description, price, available) {
        const newService = {
            id: crypto.randomUUID(), name, description, price, available
        };
        this.services.push(newService);
        return newService;
    }

    updateService(id, data) {
        const service = this.getServicesById(id);
        if (!service) { return null; }
        service.name = data.name ?? service.name;
        service.description = data.description ?? service.description;
        service.price = data.price ?? service.price;
        service.avaitable = data.avaitable ?? service.avaitable;
        return service;
    }

    deleteService(id) {
        const index = this.services.findIndex(service => service.id === id);
        if (index === -1) { return null; }
        return this.services.splice(index, 1)[0];
    }
}

export default ServiceManager;