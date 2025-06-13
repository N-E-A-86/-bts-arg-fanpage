import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css'; // Asegurate de que exista o crealo

// Componentes de ejemplo (crearemos solo el de lista de noticias)
const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Usa la variable de entorno para la URL de la API
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/news`);
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
              <h3>{item.title}</h3>
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

const NewsDetail = () => {
  // Este componente se implementaría para mostrar una noticia individual
  // Por ahora, es un placeholder
  return (
    <div className="container">
      <h2>Detalle de Noticia (Próximamente)</h2>
      <p>Aquí se mostrará el contenido completo de una noticia.</p>
      <Link to="/" className="back-link">Volver a Noticias</Link>
    </div>
  );
};

const Home = () => (
  <div className="container welcome-section">
    <h1>¡Bienvenido al ARMY Argentina Fanpage!</h1>
    <p>Tu fuente número uno para todas las novedades y actualizaciones de BTS en Argentina.</p>
    <img src="https://i.imgur.com/example_bts_image.jpg" alt="BTS Group" className="hero-image"/> {/* Reemplaza con una imagen real de BTS */}
    <Link to="/news" className="cta-button">Ver Últimas Noticias</Link>
  </div>
);

function App() {
  return (
    <Router>
      <header className="navbar">
        <nav className="container">
          <Link to="/" className="logo">ARMY Argentina</Link>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/news">Noticias</Link></li>
            {/* Agrega más enlaces para futuras secciones */}
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} ARMY Argentina Fanpage. Todos los derechos reservados al ARMY.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;