const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'ARMY Argentina'
  },
  imageUrl: {
    type: String,
    required: false
  },
  publicationDate: {
    type: Date,
    default: Date.now
  },
  tags: [String] // Array de strings para etiquetas (ej: 'Comeback', 'Jimin', 'Concierto')
}, {
  timestamps: true // Añade createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('News', newsSchema);