import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT||8080;

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error de conexión:", err));


const swaggerOptions ={
  definition:{
    openapi:"3.0.1",
    info:{
      title: "AdoptMe API",
      description: "Documentación del proyecto Adoptme para entrega final backend III"
    }
  },
  apis:[process.cwd()+"/src/docs/**/*.yaml"]
}
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs))

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.use('/api/mocks', mocksRouter);


app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
export default app;
