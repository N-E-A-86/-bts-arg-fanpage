import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importa los componentes desde sus nuevos archivos
import Navbar from './components/Navbar';
import Home from './components/Home';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail'; // Ahora importa el componente funcional
import Footer from './components/Footer';

import './App.css'; // Asegúrate de que tu App.css siga existiendo

function App() {
  return (
    <Router>
      <div className="App"> {/* Envuelve toda la app con una div 'App' si quieres */}
        <Navbar /> {/* Usa el componente Navbar */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Usa el componente Home */}
            <Route path="/news" element={<NewsList />} /> {/* Usa el componente NewsList */}
            {/* Esta ruta es la clave para ver el detalle de la noticia */}
            <Route path="/news/:id" element={<NewsDetail />} />
            {/* Aquí puedes agregar más rutas para futuras secciones */}
          </Routes>
        </main>
        <Footer /> {/* Usa el componente Footer */}
      </div>
    </Router>
  );
}

export default App;
