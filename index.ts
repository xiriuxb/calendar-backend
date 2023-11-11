require('dotenv').config();
import express from 'express'
import authRoutes from './routes/auth.routes'
import { dbConnection } from './database/db.config';
//Crear el servidor de express
const app = express();

//DB connection
dbConnection();

app.use(express.static('public'));

//Rutas
app.use('/api/auth',authRoutes);

//Escuchar peticiones

app.listen(process.env.PORT,()=>{console.log('Servidor corriendo en el puerto ',process.env.PORT)});

//3476.04