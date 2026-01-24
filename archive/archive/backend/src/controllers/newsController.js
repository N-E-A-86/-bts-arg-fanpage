const News = require('../../models/News');

// Obtener todas las noticias
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publicationDate: -1 }); // Ordenar por fecha descendente
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las noticias', error: error.message });
  }
};

// Obtener una noticia por ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'Noticia no encontrada' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la noticia', error: error.message });
  }
};

// Crear una nueva noticia (normalmente necesitaría autenticación y autorización)
exports.createNews = async (req, res) => {
  try {
    const newNews = new News(req.body);
    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la noticia', error: error.message });
  }
};

// Actualizar una noticia (normalmente necesitaría autenticación y autorización)
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!news) {
      return res.status(404).json({ message: 'Noticia no encontrada' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la noticia', error: error.message });
  }
};

// Eliminar una noticia (normalmente necesitaría autenticación y autorización)
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'Noticia no encontrada' });
    }
    res.status(200).json({ message: 'Noticia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la noticia', error: error.message });
  }
};