# Node.js Product Management API - Express + Sequelize + Redis 🟢

## 📋 Descripción
API REST para gestión de productos que combina la potencia de Sequelize como ORM con Redis para caché de alto rendimiento. Este proyecto implementa operaciones CRUD completas con optimización de consultas mediante caché distribuido.

**Propósito principal:** Proporcionar una API eficiente para la gestión de productos con capacidades de caché inteligente.

**Tecnologías principales utilizadas:**
- Node.js (Runtime)
- Express.js (Framework web)
- Sequelize (ORM)
- MySQL (Base de datos)
- Redis (Sistema de caché)
- ES6+ Modules

**Funcionalidades clave:**
- CRUD completo de productos
- Sistema de caché con Redis (TTL: 30 minutos)
- Invalidación automática de caché
- Manejo robusto de errores
- Configuración mediante variables de entorno

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js >= 16.0.0
- MySQL >= 8.0
- Redis >= 6.0
- npm >= 8.0.0

### Pasos de instalación

1. **Clonación del repositorio**
```bash
git clone https://github.com/sacom14/node_sequelize_productos
cd Node_UA3_AA
```

2. **Instalación de dependencias**
```bash
npm install
```

3. **Configuración de variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

4. **Ejecución del servidor**
```bash
npm start          # Producción
npm run dev        # Desarrollo con watch mode
```

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor en modo producción |
| `npm run dev` | Inicia el servidor con auto-recarga |
| `npm run test` | Ejecuta las pruebas (pendiente implementar) |

## 📁 Estructura del Proyecto

```
Node_UA3_AA/
├── models/                 # Modelos de Sequelize
│   ├── index.js           # Configuración de conexión a BD
│   └── product.js         # Modelo Product
├── routes/                # Definición de rutas
│   └── productRoutes.js   # Rutas CRUD de productos
├── .env                   # Variables de entorno (no versionado)
├── .env.example          # Plantilla de variables de entorno
├── .gitignore            # Archivos ignorados por Git
├── index.js              # Punto de entrada de la aplicación
├── package.json          # Dependencias y scripts
├── redis.js              # Configuración del cliente Redis
└── README.md             # Documentación del proyecto
```

**Nota sobre organización:** La estructura sigue el patrón MVC simplificado, separando claramente modelos, rutas y configuración. Es fácilmente escalable para añadir más entidades y middlewares.

## 📄 Descripción Detallada de Archivos

### Archivos Principales

**index.js** - Punto de entrada principal
- Configura Express y middlewares
- Inicializa conexión con Sequelize
- Define el puerto y rutas principales

**redis.js** - Cliente Redis
```javascript
import { createClient } from 'redis';
const redisClient = createClient();
```

### Directorios

**models/** - Contiene los modelos de datos
- `models/index.js`: Configuración de Sequelize con MySQL
- `models/product.js`: Modelo Product con validaciones

**routes/** - Definición de endpoints
- `routes/productRoutes.js`: Rutas CRUD con implementación de caché

## 🛣️ API Routes - Documentación Detallada

### GET /products
**Propósito:** Obtener todos los productos con caché inteligente

**Método:** `GET`  
**Endpoint:** `/products`  
**Body:** No requerido

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "name": "Producto 1",
    "description": "Descripción del producto",
    "price": 29.99,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Errores comunes:**
- `500`: Error interno del servidor

### POST /products
**Propósito:** Crear un nuevo producto e invalidar caché

**Método:** `POST`  
**Endpoint:** `/products`

**Body de ejemplo:**
```json
{
  "name": "Nuevo Producto",
  "description": "Descripción detallada",
  "price": 49.99
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 2,
  "name": "Nuevo Producto",
  "description": "Descripción detallada",
  "price": 49.99,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### PUT /products/:id
**Propósito:** Actualizar un producto existente

**Método:** `PUT`  
**Endpoint:** `/products/{id}`

**Body de ejemplo:**
```json
{
  "name": "Producto Actualizado",
  "description": "Nueva descripción",
  "price": 39.99
}
```

**Respuesta exitosa (200):** Producto actualizado  
**Errores comunes:**
- `404`: Producto no encontrado
- `500`: Error interno del servidor

### DELETE /products/:id
**Propósito:** Eliminar un producto

**Método:** `DELETE`  
**Endpoint:** `/products/{id}`  
**Body:** No requerido

**Respuesta exitosa (204):** Sin contenido  
**Errores comunes:**
- `404`: Producto no encontrado
- `500`: Error interno del servidor

## 🔧 Funcionalidades Detalladas

### Sistema de Caché con Redis
- **TTL (Time To Live):** 1800 segundos (30 minutos)
- **Invalidación automática:** Al crear nuevos productos
- **Clave de caché:** `products:all`
- **Optimización:** Solo consulta la BD si no hay datos en caché

### Validación de Datos
- Campos obligatorios: `name`, `description`, `price`
- Tipos de datos validados por Sequelize
- Manejo de errores de validación

### Manejo de Errores
- Logs detallados en consola
- Respuestas JSON consistentes
- Códigos de estado HTTP apropiados

### Persistencia de Datos
- ORM Sequelize con MySQL
- Sincronización automática de modelos
- Manejo de conexiones con pooling

## 🧪 Pruebas

### Ejemplos con cURL

**Obtener todos los productos:**
```bash
curl -X GET http://localhost:3000/products
```

**Crear un producto:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"Laptop gaming","price":999.99}'
```

**Actualizar un producto:**
```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop Pro","description":"Laptop gaming profesional","price":1299.99}'
```

**Eliminar un producto:**
```bash
curl -X DELETE http://localhost:3000/products/1
```

## 📊 Configuración de Variables de Entorno

El proyecto utiliza las siguientes variables de entorno (ver `.env.example`):

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `DB_HOST` | Host de MySQL | `localhost` |
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contraseña de MySQL | `admin` |
| `DB_NAME` | Nombre de la base de datos | `usuarios` |

⚠️ **Nota importante:** Asegúrate de tener Redis ejecutándose en el puerto por defecto (6379) antes de iniciar la aplicación.

## 👤 Información del Autor

**Proyecto:** Node.js Product Management API  
**Versión:** 1.0.0  
**Fecha:** junio 2025
**Tecnologías:** Node.js, Express, Sequelize, MySQL, Redis

---
