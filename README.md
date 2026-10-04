# Curso de Programación Backend I - Clase 5: Arquitectura en Capas (DAO y Repository)

API del Sistema de Turnos y Reservas que implementa una arquitectura en capas con separación de responsabilidades utilizando el patrón DAO (Data Access Object) y Repository.

## Descripción del Proyecto

Este proyecto es parte del **Curso de Programación Backend I**, correspondiente a la **Clase 5** titulada "Arquitectura en capas: DAO, y Repository". El objetivo principal es implementar una API REST para gestionar servicios y reservas en una plataforma de turnos, aplicando principios de arquitectura en capas para lograr un código más mantenible, escalable y testeable.

La arquitectura implementada separa claramente las responsabilidades en diferentes capas:

- **DAO (Data Access Object)**: Capa de acceso a datos que interactúa directamente con la persistencia (archivos JSON)
- **Repository**: Capa de abstracción que encapsula el acceso a datos y proporciona una interfaz para la capa de negocio
- **Service**: Capa de lógica de negocio que contiene las reglas y validaciones de la aplicación
- **Controller**: Capa que maneja las solicitudes HTTP y coordina las respuestas
- **Router**: Capa que define las rutas y las vincula con los controladores

## Tecnologías

- Node.js
- Express
- Módulo nativo `fs` (File System) para persistencia en JSON
- dotenv para gestión de variables de entorno
- nodemon para desarrollo con recarga automática

## Estructura del Proyecto

```
backend-turnos-reservas/
├── src/
│   ├── app.js                    # Configuración de Express y rutas principales
│   ├── server.js                 # Punto de entrada del servidor
│   ├── data/
│   │   └── services.json         # Archivo de persistencia de datos de servicios
│   ├── dao/
│   │   └── services.dao.js       # Capa DAO: acceso directo a archivos JSON
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
├── .env.example                  # Plantilla de variables de entorno
└── README.md
```

## Arquitectura en Capas Implementada

### Capa DAO (Data Access Object)

Ubicación: `src/dao/services.dao.js`

El DAO contiene las operaciones CRUD que dependen específicamente de nuestra persistencia actual (archivos JSON). Sus responsabilidades son:

- Leer y escribir archivos JSON utilizando el módulo `fs/promises`
- Generar IDs únicos utilizando `crypto.randomUUID()`
- Realizar operaciones básicas de búsqueda, creación, actualización y eliminación
- No contiene lógica de negocio, solo operaciones de acceso a datos

**Métodos principales:**
- `getAll()`: Recupera todos los servicios desde el archivo JSON
- `getById(id)`: Busca un servicio por su ID
- `create(data)`: Crea un nuevo servicio con ID autogenerado
- `update(id, data)`: Actualiza un servicio existente
- `delete(id)`: Elimina un servicio y lo retorna

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

Crear un archivo `.env` basado en `.env.example`:

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env y definir el puerto
PORT=8080
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor en modo desarrollo

```bash
npm run dev
```

El servidor inicia en `http://localhost:8080` (o el puerto definido en `.env`)

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
      "id": "uuid-del-servicio",
      "name": "Clases de Programación",
      "duration": 120,
      "price": 12345,
      "category": "IT"
    }
  ]
}
```

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
    "id": "uuid-del-servicio",
    "name": "Clases de Programación",
    "duration": 120,
    "price": 12345,
    "category": "IT"
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
- URL: `http://localhost:8080/api/services/{uuid-del-servicio}`

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
    "id": "nuevo-uuid-generado",
    "name": "Consulta médica",
    "duration": 30,
    "price": 12000,
    "category": "salud"
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
    "id": "uuid-del-servicio",
    "name": "Consulta médica actualizada",
    "duration": 30,
    "price": 15000,
    "category": "salud"
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
    "id": "uuid-del-servicio",
    "name": "Consulta médica",
    "duration": 30,
    "price": 12000,
    "category": "salud"
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

1. **DAO**: `src/dao/bookings.dao.js`
   - Implementar operaciones CRUD para bookings
   - Persistir en `src/data/bookings.json`
   - Generar IDs únicos con `crypto.randomUUID()`

2. **Repository**: `src/repositories/bookings.repository.js`
   - Crear clase `BookingsRepository`
   - Inyectar `BookingsDAO` como dependencia
   - Delegar operaciones al DAO

3. **Service**: `src/services/bookings.service.js`
   - Crear clase `BookingsService`
   - Implementar validaciones específicas para bookings
   - Ejemplo: validar que el servicio exista, que la fecha sea futura, etc.

4. **Controller**: `src/controllers/bookings.controller.js`
   - Implementar controladores para CRUD de bookings
   - Manejar códigos de estado HTTP apropiados

5. **Router**: Ya existe `src/routes/bookings.router.js` pero debe completarse con las rutas correspondientes

### Posibles validaciones para Bookings:

- Verificar que el servicio asociado exista
- Validar que la fecha de reserva sea futura
- Evitar reservas duplicadas para el mismo servicio y fecha
- Validar que los datos del cliente estén completos

## Persistencia de Datos

El proyecto utiliza archivos JSON para persistencia:

- **Servicios**: `src/data/services.json`
- **Reservas**: `src/data/bookings.json` (por crear)

Los datos se mantienen aunque se reinicie el servidor. Para verificar la persistencia:

1. Realizar operaciones POST, PUT o DELETE
2. Revisar el archivo JSON correspondiente en `src/data/`
3. Reiniciar el servidor y verificar que los datos persisten

## Beneficios de la Arquitectura en Capas

Esta arquitectura proporciona:

- **Separación de responsabilidades**: Cada capa tiene una función específica
- **Mantenibilidad**: Cambios en una capa no afectan necesariamente a otras
- **Testeabilidad**: Cada capa puede probarse independientemente
- **Escalabilidad**: Fácil agregar nuevas funcionalidades o cambiar persistencia
- **Reutilización**: El Repository puede reutilizarse
