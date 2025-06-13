require('dotenv').config(); // Carga las variables de entorno al inicio
const app = require('./src/app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Conexión a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('🎉 Conectado a MongoDB Atlas 🎉');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB:', err.message);
    process.exit(1); // Sale de la aplicación si no se puede conectar a la DB
  });

// Manejo de errores de conexión de Mongoose (opcional pero recomendado)
mongoose.connection.on('error', err => {
  console.error('❌ Error de conexión de Mongoose:', err);
});
