const express = require('express');
const cors = require('cors');
const path = require('path');
const prendasRoutes = require('./routes/prendas');
const app = express();

// Habilitar CORS para peticiones externas
app.use(cors());

// Sirve las imágenes estáticas desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware para procesar datos JSON
app.use(express.json());

// Rutas para prendas
app.use('/prendas', prendasRoutes);

// Configuración del puerto
const PORT = 3006;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
