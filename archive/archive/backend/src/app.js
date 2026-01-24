const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');

const app = express();

// Middlewares
app.use(cors()); // Permite peticiones de diferentes orígenes (frontend)
app.use(express.json()); // Permite a Express leer JSON en el body de las peticiones

// Rutas
app.use('/api/news', newsRoutes); // Prefijo para todas las rutas de noticias

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡API de BTS en funcionamiento! 💜');
});

module.exports = app;