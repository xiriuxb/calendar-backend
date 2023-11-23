require("dotenv").config();
import express from "express";
import authRoutes from "./routes/auth.routes";
import eventsRoutes from "./routes/events.routes";
import { dbConnection } from "./database/db.config";
import cors from "cors";
//Crear el servidor de express
const app = express();

//DB connection
dbConnection();

app.use(cors());

app.use(express.static("public"));

//Rutas
app.use("/api/auth", authRoutes);

app.use("/api/events", eventsRoutes);

//Escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto ", process.env.PORT);
});

//3476.04
