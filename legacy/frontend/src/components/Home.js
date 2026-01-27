import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link

const Home = () => (
  <div className="container welcome-section">
    <h1>¡Bienvenid@ al ARMY Argentina Fanpage!</h1>
    <p>Tu fuente número uno para todas las novedades y actualizaciones de BTS en Argentina.</p>
    {/*
      Reemplaza esta URL de imagen con una más estable.
      Idealmente, coloca una imagen en frontend/public/images/ y usa src="/images/tu_imagen.png"
    */}
    <img src="/image/bts-img-home.png" alt="BTS Group" className="hero-image" />
    {/* Botones principales */}
    <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4"> {/* Flexbox de Bootstrap para organizar botones */}
      <Link to="/news" className="cta-button">Ver Últimas Noticias</Link>
      <Link to="/register" className="cta-button">Registrarse</Link>
      <Link to="/login" className="cta-button">Iniciar Sesión</Link>
      <Link to="/community" className="cta-button">Ir al Foro</Link> {/* Botón para el futuro foro/comunidad */}
    </div>
  </div>
);

export default Home;
