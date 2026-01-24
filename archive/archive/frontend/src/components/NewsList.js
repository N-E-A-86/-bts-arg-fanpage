import axios from 'axios'
// Este código lo COPIAS de tu actual App.js y lo PEGAS en frontend/src/components/NewsList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link si se usa

// Aquí pegas el código de NewsList
const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
// NUEVA LÍNEA CORREGIDA
const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/news`);
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <div className="container">Cargando noticias...</div>;
  if (error) return <div className="container error">Error: {error.message}</div>;

  return (
    <div className="container">
      <h2>Últimas Noticias de BTS 💜</h2>
      {news.length === 0 ? (
        <p>No hay noticias disponibles. ¡Agregá algunas desde Postman/Insomnia a la API!</p>
      ) : (
        <div className="news-grid">
          {news.map(item => (
            <div key={item._id} className="news-card">
              {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="news-image" />}
              <h3>
                  <Link to={`/news/${item._id}`} className="news-title-link">
                      {item.title}
                  </Link>
              </h3>
              <p>{item.content.substring(0, 150)}...</p>
              <span className="news-date">{new Date(item.publicationDate).toLocaleDateString()}</span>
              <Link to={`/news/${item._id}`} className="read-more">Leer más</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList; // ¡No olvides exportarlo!