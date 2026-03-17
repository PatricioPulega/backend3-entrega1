# AdoptMe API – Backend III Entrega Final

## 📌 Descripción
Este proyecto corresponde a la entrega final de Backend III.  
Se trata de una API para gestión de usuarios, mascotas y adopciones, 
documentada con **Swagger** y desplegada en **Docker** 
con conexión a **MongoDB Atlas**.

---

## 🚀 Tecnologías utilizadas
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT + Cookies
- Swagger (OpenAPI 3.0)
- Docker + Docker Compose
- Jest + Supertest (para pruebas automatizadas)

---

## 📂 Estructura principal
- `src/app.js` → Configuración principal de la API
- `src/routes/` → Routers de usuarios, mascotas, adopciones, sesiones y mocks
- `src/docs/` → Documentación Swagger en formato YAML
- `tests/` → Carpeta con pruebas automatizadas
- `.env` → Variables de entorno (no se debe versionar)

🐳 Levantar el proyecto con Docker
1. Construir y levantar el contenedor
docker compose up --build


2. Ver logs de ejecución
Deberías ver:
Listening on 8080
MongoDB conectado


3. Acceder a la API
- Swagger UI → http://localhost:8080/api/docs
- Endpoint de mascotas → http://localhost:8080/api/pets

📌 Documentación Swagger
La documentación de la API está disponible en Swagger UI:
👉 http://localhost:8080/api/docs
Los archivos YAML se encuentran en src/docs/ y describen los endpoints de:
- Usuarios (users.router.js)
- Mascotas (pets.router.js)
- Adopciones (adoption.router.js)
- Sesiones (sessions.router.js)
- Mocks (mocks.router.js)

📌 Imagen en Docker Hub
La imagen está publicada en Docker Hub:
👉 patriciopulega/adoptme-api
Cómo correrla en cualquier PC
docker pull patriciopulega/adoptme-api:1.0
docker run -p 8080:8080 patriciopulega/adoptme-api:1.0


La API quedará disponible en:
👉 http://localhost:8080

🧪 Tests automatizados
El proyecto incluye pruebas con Jest + Supertest para validar endpoints y lógica de negocio.
Correr tests en local
npm test


Correr tests dentro del contenedor
docker exec -it adoptme-api npm test


Los tests verifican:
- Registro y login de usuarios
- CRUD de mascotas
- Flujo de adopciones
- Sesiones y autenticación JWT
- Endpoints de mocks

🔧 Errores comunes y soluciones
- Puerto 8080 ocupado → Detener procesos que lo usen (netstat -ano | findstr :8080 + taskkill /PID <PID> /F) o cambiar el mapeo en docker-compose.yml:
ports:
  - "3000:8080"
- Error de conexión a MongoDB → Revisar que la variable MONGO_URL esté definida en .env y accesible desde Docker.

📜 Autor
Patricio Pulega
