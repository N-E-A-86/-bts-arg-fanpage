import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} ARMY Argentina Fanpage. Todos los derechos reservados al ARMY.</p>
      </div>
    </footer>
  );
};

export default Footer;