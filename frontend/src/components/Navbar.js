import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
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
  );
};

export default Navbar;