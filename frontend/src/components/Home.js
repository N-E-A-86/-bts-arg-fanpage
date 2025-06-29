// Este código lo COPIAS de tu actual App.js y lo PEGAS en frontend/src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link si se usa

const Home = () => (
  <div className="container welcome-section">
    <h1>¡Bienvenido al ARMY Argentina Fanpage!</h1>
    <p>Tu fuente número uno para todas las novedades y actualizaciones de BTS en Argentina.</p>
    <img src="https://th.bing.com/th/id/OIP.hFafizVzp9EhNnCpOSxkEAHaHa?rs=1&pid=ImgDetMain" alt="BTS Group" className="hero-image"/> {/* Reemplaza con una imagen real de BTS */}
    <Link to="/news" className="cta-button">Ver Últimas Noticias</Link>
  </div>
);

export default Home; // ¡No olvides exportarlo!