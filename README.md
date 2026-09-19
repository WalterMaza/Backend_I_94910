# Clase 3: Persistencia con Archivos JSON

API de Sistema de Turnos y Reservas que implementa persistencia de datos utilizando el módulo nativo `fs` de Node.js para trabajar con archivos JSON.

## Tecnologías

- Node.js
- Express
- Módulo nativo `fs` (File System)

## Estructura del Proyecto

```
backend-turnos-reservas/
├── src/
│   ├── app.js              # Configuración de rutas y Express
│   ├── server.js           # Punto de entrada del servidor
│   ├── data/
│   │   └── services.json   # Archivo de persistencia de datos
│   └── managers/
│       └── ServiceManager.js # Clase para manejo de archivos JSON
├── package.json
└── .env
```

## Persistencia con fs

El proyecto utiliza el módulo `fs` con promesas para leer y escribir archivos JSON:

```javascript
import { promises as fs } from "fs"

// Leer archivo JSON
const data = await fs.readFile(this.path, "utf-8")
const services = JSON.parse(data)

// Escribir archivo JSON
const json = JSON.stringify(services, null, 2)
await fs.writeFile(this.path, json)
```

## Instalación y Ejecución (de las dependencias y del servidor)

```bash
npm install
npm run dev
```

El servidor inicia en `http://localhost:8080`

## Endpoints API

### 1. GET /
**Descripción:** Ruta principal de la API

**Respuesta esperada:**
```json
{
  "status": "success",
  "message": "API del Sistema de Turnos y Reservas"
}
```

---

### 2. GET /api/services
**Descripción:** Obtener todos los servicios (opcionalmente filtrar por categoría)

**Query params (opcional):**
- `category`: Filtrar por categoría (ej: `?category=IT`)

**Respuesta esperada:**
```json
{
  "status": "success",
  "payload": [
    {
      "id": 1,
      "name": "Clases de Programación",
      "duration": 120,
      "price": 12345,
      "category": "IT",
      "available": true
    }
  ]
}
```

**Ejemplo Postman:**
- Método: GET
- URL: `http://localhost:8080/api/services`
- URL con filtro: `http://localhost:8080/api/services?category=IT`

---

### 3. GET /api/services/:sid
**Descripción:** Obtener un servicio por su ID

**Respuesta esperada (éxito):**
```json
{
  "status": "success",
  "payload": {
    "id": 1,
    "name": "Clases de Programación",
    "duration": 120,
    "price": 12345,
    "category": "IT",
    "available": true
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

**Ejemplo Postman:**
- Método: GET
- URL: `http://localhost:8080/api/services/1`

---

### 4. POST /api/services
**Descripción:** Crear un nuevo servicio (persiste en `services.json`)

**Body (JSON):**
```json
{
  "name": "Consulta médica",
  "duration": 30,
  "price": 12000,
  "category": "salud",
  "available": true
}
```

**Respuesta esperada:**
```json
{
  "status": "success",
  "payload": {
    "id": 2,
    "name": "Consulta médica",
    "duration": 30,
    "price": 12000,
    "category": "salud",
    "available": true
  }
}
```

**Ejemplo Postman:**
- Método: POST
- URL: `http://localhost:8080/api/services`
- Body → raw → JSON: `{ "name": "Consulta médica", "duration": 30, "price": 12000, "category": "salud", "available": true }`

---

### 5. PUT /api/services/:sid
**Descripción:** Actualizar un servicio existente (persiste en `services.json`)

**Body (JSON):**
```json
{
  "name": "Consulta médica actualizada",
  "price": 15000
}
```

**Respuesta esperada:**
```json
{
  "status": "success",
  "payload": {
    "id": 2,
    "name": "Consulta médica actualizada",
    "duration": 30,
    "price": 15000,
    "category": "salud",
    "available": true
  }
}
```

**Ejemplo Postman:**
- Método: PUT
- URL: `http://localhost:8080/api/services/2`
- Body → raw → JSON: `{ "name": "Consulta médica actualizada", "price": 15000 }`

---

### 6. DELETE /api/services/:sid
**Descripción:** Eliminar un servicio (persiste en `services.json`)

**Respuesta esperada:**
```json
{
  "status": "success",
  "message": "Servicio eliminado"
}
```

**Ejemplo Postman:**
- Método: DELETE
- URL: `http://localhost:8080/api/services/2`

---

## Comprobando la Persistencia

Después de realizar operaciones POST, PUT o DELETE, verifica el archivo `src/data/services.json` para confirmar que los cambios se han persistido correctamente. Los datos se mantienen aunque se reinicie el servidor.
