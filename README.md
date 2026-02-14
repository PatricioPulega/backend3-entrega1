📌 Entrega 1 – Backend 3
🔹 Estructura
- package.json: con dependencias correctas (express, mongoose, faker, bcrypt, jsonwebtoken, etc.), scripts para start, dev y test.
- src/app.js: configuración de Express y conexión a MongoDB Atlas.
- src/routes/mocks.router.js: contiene los tres endpoints pedidos.
- dao/models/User.js / Pet.js: modelos con validaciones (specie en mascotas, pets vacío en usuarios).
- utils/mockingUsers.js: función para generar usuarios con contraseña encriptada y roles alternados.

🔹 Endpoints obligatorios
- GET /api/mocks/mockingusers?num=X
- Genera usuarios mockeados (default 50).
- Contraseña encriptada, rol dinámico, pets vacío.
- GET /api/mocks/mockingpets?num=X
- Genera mascotas mockeadas (default 100).
- Campos: name, specie, adopted.
- POST /api/mocks/generateData
- Inserta usuarios y mascotas en MongoDB Atlas según body.
- Respuesta: "status": "success" y mensaje con cantidades.

🔹 Validación
- Navegador muestra 50 usuarios por defecto.
- Postman devuelve mascotas mockeadas con specie: "dog".
- generateData inserta correctamente en Atlas y devuelve mensaje de éxito.
