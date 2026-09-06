# Backend Turnos y Reservas

Proyecto de backend desarrollado en la Clase 1 del curso de Programación Backend. Este proyecto implementa un servidor HTTP básico utilizando el módulo nativo `http` de Node.js, con el objetivo de aprender los fundamentos de la creación de APIs REST.

## Características

- **Módulo nativo HTTP**: Utiliza el módulo `http` de Node.js para crear el servidor sin frameworks externos
- **Variables de entorno**: Implementa configuración mediante variables de entorno usando `dotenv`
- **Sistema de rutas**: Implementa rutas básicas para responder a diferentes endpoints
- **Respuestas JSON**: Capacidad de responder datos en formato JSON
- **Manejo de errores**: Respuesta 404 para rutas no encontradas

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución JavaScript
- **Módulo nativo `http`**: Para la creación del servidor HTTP
- **dotenv**: Para la gestión de variables de entorno (v17.4.2)
- **ES Modules**: Sistema de módulos de JavaScript (`type: "module"`)

## Instalación

1. Clonar el repositorio
2. Navegar al directorio del proyecto
3. Instalar las dependencias:

```bash
npm install
```

Por el momento esto instalará la librería `dotenv` necesaria para la gestión de variables de entorno.

## Configuración de Variables de Entorno

El proyecto utiliza variables de entorno para configurar el puerto del servidor. Sigue estos pasos:

1. Copiar el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Editar el archivo `.env` y configurar las variables:

```env
PORT=3000
```

- **PORT**: Puerto en el que el servidor escuchará las peticiones (por defecto: 3000)

**Nota**: El archivo `.env` está incluido en `.gitignore` por seguridad, por lo que no se sube al repositorio.

## Estructura del Proyecto

```
backend-turnos-reservas/
├── src/
│   └── app.js          # Archivo principal del servidor
├── .env                # Variables de entorno (no versionado)
├── .env.example        # Plantilla de variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── package.json        # Configuración del proyecto y dependencias
└── README.md           # Documentación del proyecto
```

## Uso del Módulo Nativo HTTP

El proyecto utiliza el módulo nativo `http` de Node.js para crear el servidor. Este módulo proporciona:

- **http.createServer()**: Crea una instancia del servidor HTTP
- **req (request)**: Objeto que contiene información sobre la petición recibida (método, URL, headers, etc.)
- **res (response)**: Objeto que permite construir y enviar la respuesta al cliente
- **res.writeHead()**: Establece el código de estado y headers de la respuesta
- **res.end()**: Envía el cuerpo de la respuesta y finaliza la petición

## Ejecución

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000` (o el puerto configurado en `.env`).

## Rutas Disponibles

### GET `/`
Ruta principal que responde con un mensaje de bienvenida.

**Respuesta:**
- Status Code: 200
- Content-Type: text/plain; charset=utf-8
- Body: "Hola Mundo"

### GET `/usuarios`
Ruta que devuelve una lista de usuarios en formato JSON.

**Respuesta:**
- Status Code: 200
- Content-Type: application/json
- Body:
```json
[
  { "id": 1, "nombre": "Juan" },
  { "id": 2, "nombre": "Ana" },
  { "id": 3, "nombre": "Ariel" }
]
```

### Rutas No Encontradas
Cualquier ruta que no coincida con las anteriores devuelve un error 404.

**Respuesta:**
- Status Code: 404
- Content-Type: text/plain; charset=utf-8
- Body: "Ruta no encontrada"

## Conceptos Aprendidos

- **Creación de servidores HTTP** con el módulo nativo de Node.js
- **Manejo de peticiones y respuestas** HTTP (req, res)
- **Configuración de variables de entorno** con dotenv
- **Sistema de rutas** básico
- **Diferentes tipos de contenido** (text/plain, application/json)
- **Códigos de estado HTTP** (200, 404)
- **Serialización de datos** con JSON.stringify()
- **ES Modules** para importación/exportación de módulos

