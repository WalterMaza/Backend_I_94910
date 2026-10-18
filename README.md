# Curso de Programación Backend I - Clase 6: MongoDB Atlas y Mongoose

API del Sistema de Turnos y Reservas que implementa una arquitectura en capas con separación de responsabilidades utilizando el patrón DAO (Data Access Object) y Repository, con persistencia en MongoDB Atlas mediante Mongoose.

## Descripción del Proyecto

Este proyecto es parte del **Curso de Programación Backend I**, correspondiente a la **Clase 6** titulada "MongoDB Atlas y Mongoose". El objetivo principal es implementar una API REST para gestionar servicios y reservas en una plataforma de turnos, aplicando principios de arquitectura en capas para lograr un código más mantenible, escalable y testeable, ahora con persistencia profesional en MongoDB.

La arquitectura implementada separa claramente las responsabilidades en diferentes capas:

- **DAO (Data Access Object)**: Capa de acceso a datos que interactúa directamente con MongoDB mediante Mongoose
- **Repository**: Capa de abstracción que encapsula el acceso a datos y proporciona una interfaz para la capa de negocio
- **Service**: Capa de lógica de negocio que contiene las reglas y validaciones de la aplicación
- **Controller**: Capa que maneja las solicitudes HTTP y coordina las respuestas
- **Router**: Capa que define las rutas y las vincula con los controladores

### Cambio de Persistencia

Gracias a la **arquitectura en capas** implementada en la clase anterior, el cambio de persistencia de archivos JSON (módulo `fs`) a MongoDB Atlas fue transparente para las capas superiores. **Solamente se modificó la capa DAO**, mientras que Repository, Service, Controller y Router permanecieron intactos, demostrando la flexibilidad y mantenibilidad de este diseño arquitectónico.

## Tecnologías

- Node.js
- Express
- MongoDB Atlas (base de datos NoSQL en la nube)
- Mongoose (ODM para MongoDB)
- dotenv para gestión de variables de entorno
- nodemon para desarrollo con recarga automática

## Estructura del Proyecto

```
backend-turnos-reservas/
├── src/
│   ├── app.js                    # Configuración de Express y rutas principales
│   ├── server.js                 # Punto de entrada del servidor
│   ├── config/
│   │   ├── env.config.js         # Configuración de variables de entorno (dotenv)
│   │   └── database.config.js    # Conexión a MongoDB Atlas con Mongoose
│   ├── models/
│   │   └── service.models.js     # Schema y Model de Mongoose para la entidad Servicios
│   ├── dao/
│   │   └── services.dao.js       # Capa DAO: acceso a MongoDB mediante Mongoose
│   ├── repositories/
│   │   └── services.repository.js # Capa Repository: abstracción sobre el DAO
│   ├── services/
│   │   └── services.service.js    # Capa Service: lógica de negocio
│   ├── controllers/
│   │   └── services.controller.js # Capa Controller: manejo de HTTP
│   ├── routes/
│   │   ├── services.router.js    # Rutas del recurso services
│   │   └── bookings.router.js    # Rutas del recurso bookings (por completar)
│   ├── managers/                 # (Legacy - clases anteriores)
│   └── middlewares/              # Middlewares de la aplicación
├── package.json
├── .env                          # Variables de entorno (PORT y MONGO_URI)
├── .env.example                  # Plantilla de variables de entorno
└── README.md
```

## Arquitectura en Capas Implementada

## Conexión a MongoDB Atlas

### Configuración de Variables de Entorno

Ubicación: `src/config/env.config.js`

Se utiliza el paquete `dotenv` para cargar variables de entorno desde el archivo `.env`. Esto permite mantener la URI de conexión a MongoDB fuera del código fuente por seguridad.

```javascript
import dotenv from "dotenv"
dotenv.config()

export const envConfig = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI
}
```

El archivo `.env` debe contener:
```env
PORT=8080
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/nombreDB
```

### Conexión a la Base de Datos

Ubicación: `src/config/database.config.js`

La función `connectDB()` establece la conexión con MongoDB Atlas utilizando Mongoose:

```javascript
import mongoose from "mongoose"
import { envConfig } from "./env.config.js"

export const connectDB = async () => {
    try {
        await mongoose.connect(envConfig.mongoUri)
        console.log("MongoDB connected")
    } catch (error) {
        console.error("Error connecting to MongoDB", error)
        process.exit(1)
    }
}
```

La conexión se inicia en `server.js` antes de que el servidor empiece a escuchar peticiones.

## Schemas, Models y Colecciones con Mongoose

### Schema de la Entidad Servicios

Ubicación: `src/models/service.models.js`

Mongoose utiliza **Schemas** para definir la estructura de los documentos en MongoDB. El schema define los campos, sus tipos y validaciones:

```javascript
import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
})

export const ServiceModel = mongoose.model("services", serviceSchema)
```

**Conceptos clave:**
- **Schema**: Define la estructura, tipos de datos y validaciones de los documentos
- **Model**: Es una clase que representa una colección en MongoDB y proporciona métodos para interactuar con ella
- **Colección**: En MongoDB, los documentos se organizan en colecciones (equivalente a tablas en bases de datos relacionales)
- El primer parámetro de `mongoose.model()` es el nombre de la colección en MongoDB (en minúsculas y plural)

## Arquitectura en Capas Implementada

### Capa DAO (Data Access Object)

Ubicación: `src/dao/services.dao.js`

El DAO contiene las operaciones CRUD que dependen específicamente de nuestra persistencia actual (MongoDB con Mongoose). Sus responsabilidades son:

- Utilizar el Model de Mongoose para realizar operaciones de base de datos
- Mapear las operaciones de Mongoose a los métodos del DAO
- No contiene lógica de negocio, solo operaciones de acceso a datos

**Métodos principales:**
- `getAll()`: Utiliza `ServiceModel.find()` para recuperar todos los servicios
- `getById(id)`: Utiliza `ServiceModel.findById(id)` para buscar por ID
- `create(data)`: Utiliza `ServiceModel.create(data)` para crear un nuevo servicio
- `update(id, data)`: Utiliza `ServiceModel.findByIdAndUpdate(id, data, {new: true})` para actualizar
- `delete(id)`: Utiliza `ServiceModel.findByIdAndDelete(id)` para eliminar

**Operaciones de Mongoose utilizadas:**
```javascript
await ServiceModel.find()                    // Obtener todos
await ServiceModel.findById(id)             // Obtener por ID
await ServiceModel.create(data)              // Crear
await ServiceModel.findByIdAndUpdate(id, data, { new: true })  // Actualizar
await ServiceModel.findByIdAndDelete(id)     // Eliminar
```

### Capa Repository

Ubicación: `src/repositories/services.repository.js`

El Repository actúa como una capa de abstracción sobre el DAO. Sus características:

- Utiliza el DAO como dependencia (inyección de dependencias)
- Define las operaciones de datos que puede solicitar la lógica de negocio
- Permite cambiar la implementación de persistencia sin afectar la capa Service
- Delega las operaciones al DAO correspondiente

**Métodos principales:**
- `getAll()`: Delega al DAO
- `getById(id)`: Delega al DAO
- `create(data)`: Delega al DAO
- `update(id, data)`: Delega al DAO
- `delete(id)`: Delega al DAO

### Capa Service

Ubicación: `src/services/services.service.js`

El Service concentra la lógica de negocio y las reglas del dominio. Sus responsabilidades:

- Implementa validaciones de datos (campos obligatorios, valores válidos)
- Interpreta los resultados del Repository según el comportamiento esperado
- Lanza excepciones con mensajes significativos cuando ocurren errores
- No conoce detalles de HTTP ni de persistencia

**Métodos principales:**
- `getServices()`: Lista todos los servicios (sin reglas especiales)
- `getServiceById(id)`: Obtiene un servicio por ID, lanza error si no existe
- `createService(data)`: Valida campos obligatorios y precio no negativo antes de crear
- `updateService(id, data)`: Actualiza un servicio, lanza error si no existe
- `deleteService(id)`: Elimina un servicio, lanza error si no existe

### Capa Controller

Ubicación: `src/controllers/services.controller.js`

El Controller maneja las solicitudes y respuestas HTTP. Sus responsabilidades:

- Traduce entre protocolo HTTP y datos de la aplicación
- Extrae parámetros de `req.params` y `req.body`
- Llama a los métodos del Service
- Retorna respuestas HTTP con códigos de estado apropiados
- Maneja errores y retorna mensajes de error consistentes

**Controladores principales:**
- `getServices`: GET /api/services → retorna 200 con lista de servicios
- `getServiceById`: GET /api/services/:sid → retorna 200 o 404
- `createService`: POST /api/services → retorna 201 o 400
- `updateService`: PUT /api/services/:sid → retorna 200 o 404
- `deleteService`: DELETE /api/services/:sid → retorna 200 o 404

### Capa Router

Ubicación: `src/routes/services.router.js`

El Router define las rutas de la API y las vincula con los controladores:

- `GET /` → `getServices`
- `GET /:sid` → `getServiceById`
- `POST /` → `createService`
- `PUT /:sid` → `updateService`
- `DELETE /:sid` → `deleteService`

## Instalación y Ejecución

### 1. Configurar variables de entorno

Crear un archivo `.env` con las siguientes variables:

```env
PORT=8080
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/nombreDB
```

**Importante:** La `MONGO_URI` debe obtenerse desde MongoDB Atlas:
1. Crear un cluster en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear una base de datos
3. Obtener la URI de conexión desde el panel de Atlas
4. Reemplazar `<password>` con la contraseña del usuario de la base de datos

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor en modo desarrollo

```bash
npm run dev
```

El servidor inicia en `http://localhost:8080` (o el puerto definido en `.env`) y se conecta automáticamente a MongoDB Atlas.

## Endpoints API - Recurso Services

El recurso **services** ya está completamente implementado con todas las capas (DAO, Repository, Service, Controller, Router).

### 1. GET /
**Descripción:** Ruta principal de la API

**Respuesta esperada:**
```json
{
  "status": "success",
  "message": "API del Sistema de Turnos y Reservas"
}
```

**Prueba en Postman:**
- Método: GET
- URL: `http://localhost:8080/`

---

### 2. GET /api/services
**Descripción:** Obtener todos los servicios disponibles en la plataforma

**Respuesta esperada:**
```json
{
  "status": "success",
  "payload": [
    {
      "_id": "673f1a2e5b4c8d9e0f1a2b3c",
      "name": "Clases de Programación",
      "description": "Clases de programación backend",
      "duration": 120,
      "price": 12345,
      "category": "IT",
      "available": true,
      "__v": 0
    }
  ]
}
```

**Nota:** Los IDs ahora son ObjectId de MongoDB (formato de 24 caracteres hexadecimales) en lugar de UUID.

**Prueba en Postman:**
- Método: GET
- URL: `http://localhost:8080/api/services`

---

### 3. GET /api/services/:sid
**Descripción:** Obtener un servicio específico por su ID

**Respuesta esperada (éxito):**
```json
{
  "status": "success",
  "payload": {
    "_id": "673f1a2e5b4c8d9e0f1a2b3c",
    "name": "Clases de Programación",
    "description": "Clases de programación backend",
    "duration": 120,
    "price": 12345,
    "category": "IT",
    "available": true,
    "__v": 0
  }
}
```

**Respuesta esperada (no encontrado):**
```json
{
  "status": "error",
  "message": "Servicio no encontrado"
}
```

**Prueba en Postman:**
- Método: GET
- URL: `http://localhost:8080/api/services/{objectId-del-servicio}`

---

### 4. POST /api/services
**Descripción:** Crear un nuevo servicio en la plataforma

**Body (JSON):**
```json
{
  "name": "Consulta médica",
  "duration": 30,
  "price": 12000,
  "category": "salud"
}
```

**Respuesta esperada (éxito):**
```json
{
  "status": "success",
  "payload": {
    "_id": "673f1b3c6d5e8f9g0h1i2j3k",
    "name": "Consulta médica",
    "description": "Consulta médica general",
    "duration": 30,
    "price": 12000,
    "category": "salud",
    "available": true,
    "__v": 0
  }
}
```

**Respuesta esperada (error de validación):**
```json
{
  "status": "error",
  "message": "Faltan campos obligatorios"
}
```

**Prueba en Postman:**
- Método: POST
- URL: `http://localhost:8080/api/services`
- Headers: `Content-Type: application/json`
- Body → raw → JSON:
```json
{
  "name": "Consulta médica",
  "duration": 30,
  "price": 12000,
  "category": "salud"
}
```

---

### 5. PUT /api/services/:sid
**Descripción:** Actualizar un servicio existente

**Body (JSON):**
```json
{
  "name": "Consulta médica actualizada",
  "price": 15000
}
```

**Respuesta esperada (éxito):**
```json
{
  "status": "success",
  "payload": {
    "_id": "673f1a2e5b4c8d9e0f1a2b3c",
    "name": "Consulta médica actualizada",
    "description": "Consulta médica general",
    "duration": 30,
    "price": 15000,
    "category": "salud",
    "available": true,
    "__v": 0
  }
}
```

**Respuesta esperada (no encontrado):**
```json
{
  "status": "error",
  "message": "Servicio no encontrado"
}
```

**Prueba en Postman:**
- Método: PUT
- URL: `http://localhost:8080/api/services/{uuid-del-servicio}`
- Headers: `Content-Type: application/json`
- Body → raw → JSON:
```json
{
  "name": "Consulta médica actualizada",
  "price": 15000
}
```

---

### 6. DELETE /api/services/:sid
**Descripción:** Eliminar un servicio de la plataforma

**Respuesta esperada (éxito):**
```json
{
  "status": "success",
  "payload": {
    "_id": "673f1a2e5b4c8d9e0f1a2b3c",
    "name": "Consulta médica",
    "description": "Consulta médica general",
    "duration": 30,
    "price": 12000,
    "category": "salud",
    "available": true,
    "__v": 0
  }
}
```

**Respuesta esperada (no encontrado):**
```json
{
  "status": "error",
  "message": "Servicio no encontrado"
}
```

**Prueba en Postman:**
- Método: DELETE
- URL: `http://localhost:8080/api/services/{uuid-del-servicio}`

---

## Recurso Bookings - Invitación a Implementar

El recurso **bookings** (reservas) está pendiente de implementación. Basándose en la arquitectura aplicada al recurso `services`, se invita a completar las siguientes capas para el recurso `bookings`:

### Archivos a crear:

1. **Model**: `src/models/booking.models.js`
   - Definir el schema de Mongoose para bookings
   - Incluir campos como: serviceId, cliente, fecha, estado, etc.

2. **DAO**: `src/dao/bookings.dao.js`
   - Implementar operaciones CRUD para bookings utilizando Mongoose
   - Utilizar el Model de bookings para interactuar con MongoDB

3. **Repository**: `src/repositories/bookings.repository.js`
   - Crear clase `BookingsRepository`
   - Inyectar `BookingsDAO` como dependencia
   - Delegar operaciones al DAO

4. **Service**: `src/services/bookings.service.js`
   - Crear clase `BookingsService`
   - Implementar validaciones específicas para bookings
   - Ejemplo: validar que el servicio exista, que la fecha sea futura, etc.

5. **Controller**: `src/controllers/bookings.controller.js`
   - Implementar controladores para CRUD de bookings
   - Manejar códigos de estado HTTP apropiados

6. **Router**: Ya existe `src/routes/bookings.router.js` pero debe completarse con las rutas correspondientes

### Posibles validaciones para Bookings:

- Verificar que el servicio asociado exista (usando el Service de servicios)
- Validar que la fecha de reserva sea futura
- Evitar reservas duplicadas para el mismo servicio y fecha
- Validar que los datos del cliente estén completos

## Persistencia de Datos

El proyecto utiliza **MongoDB Atlas** como sistema de persistencia profesional:

- **Colección de servicios**: `services` en MongoDB
- **Colección de reservas**: `bookings` (por crear)

Los datos se almacenan en la nube en MongoDB Atlas, lo que proporciona:
- Persistencia permanente y escalable
- Acceso desde cualquier ubicación
- Backup automático
- Alta disponibilidad

Para verificar la persistencia:
1. Realizar operaciones POST, PUT o DELETE desde Postman
2. Verificar los documentos en MongoDB Atlas (panel de Atlas → Collections)
3. Reiniciar el servidor y verificar que los datos persisten en la base de datos

## Beneficios de la Arquitectura en Capas

Esta arquitectura proporciona:

- **Separación de responsabilidades**: Cada capa tiene una función específica
- **Mantenibilidad**: Cambios en una capa no afectan necesariamente a otras
- **Testeabilidad**: Cada capa puede probarse independientemente
- **Escalabilidad**: Fácil agregar nuevas funcionalidades o cambiar persistencia
- **Reutilización**: El Repository puede reutilizarse

### Demostración de Flexibilidad: Cambio de Persistencia

El paso de persistencia en archivos JSON (módulo `fs`) a MongoDB Atlas demostró la efectividad de esta arquitectura:

- **Solo se modificó la capa DAO**: El cambio de tecnología de persistencia fue transparente para las capas superiores
- **Repository, Service, Controller y Router permanecieron intactos**: No requirieron modificaciones
- **Validaciones de negocio se mantuvieron**: La lógica en la capa Service no cambió
- **Contratos de la API se mantuvieron**: Los endpoints y respuestas HTTP no cambiaron

Esto demuestra cómo una buena arquitectura en capas facilita la evolución del software sin introducir riesgos ni romper funcionalidades existentes.
