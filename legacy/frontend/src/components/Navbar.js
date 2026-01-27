import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Asegúrate de importar NavLink

const Navbar = () => {
  return (
    // Usa clases de Bootstrap para un navbar responsive y con estilo
    <nav className="navbar navbar-expand-lg navbar-dark bg-bts-purple">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">BTS Argentina ARMY Fanpage</Link>
        {/* Botón para el menú hamburguesa en móviles */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Contenido del navbar que colapsa */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Enlaces principales a la izquierda */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* NavLink se usa para añadir la clase 'active' automáticamente */}
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/news">Noticias</NavLink>
            </li>
            {/* Nuevas Categorías (placeholder por ahora) */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/articles">Artículos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/events-army">Eventos ARMY</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/multimedia">Multimedia</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/translations">Traducciones</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/community">Comunidad</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/merchandise">Mercancía</NavLink>
            </li>
          </ul>
          {/* Enlaces de Autenticación a la derecha */}
          <ul className="navbar-nav ms-auto">
           <li className="nav-item">
    <NavLink className="nav-link" to="/register">Registrarse</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to="/login">Iniciar Sesión</NavLink>
  </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;