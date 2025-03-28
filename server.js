require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use('/api/tasks', require('./routes/taskRoutes'));

// Cambiar el puerto de tasks-service
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Tasks-Service corriendo en el puerto ${PORT}`));