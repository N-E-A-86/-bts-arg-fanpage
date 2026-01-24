const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Rutas para las noticias
router.get('/', newsController.getAllNews); // Obtener todas las noticias
router.get('/:id', newsController.getNewsById); // Obtener una noticia por ID
router.post('/', newsController.createNews); // Crear una nueva noticia
router.put('/:id', newsController.updateNews); // Actualizar una noticia
router.delete('/:id', newsController.deleteNews); // Eliminar una noticia

module.exports = router;