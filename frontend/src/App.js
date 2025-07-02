import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './components/Home'; // Asegúrate de que esta línea exista y sea correcta
import { AuthProvider } from './context/AuthContext';
// import Footer from './components/Footer'; // Si lo tienes
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {/* ¡¡¡Esta es la línea CLAVE para tu portada!!! */}
            <Route path="/" element={<Home />} exact />

            <Route path="/news" element={<NewsList />} /> {/* Las noticias en /news */}
            <Route path="/news/:id" element={<NewsDetail />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Tus otras rutas de categorías */}
            <Route path="/articles" element={<div>Página de Artículos (Próximamente)</div>} />
            <Route path="/events-army" element={<div>Página de Eventos ARMY (Próximamente)</div>} />
            <Route path="/multimedia" element={<div>Página de Multimedia (Próximamente)</div>} />
            <Route path="/translations" element={<div>Página de Traducciones (Próximamente)</div>} />
            <Route path="/community" element={<div>Página de Comunidad (Próximamente)</div>} />
            <Route path="/merchandise" element={<div>Página de Mercancía (Próximamente)</div>} />

          </Routes>
        </div>
        {/* {Footer && <Footer />} */}
      </AuthProvider>
    </Router>
  );
}

export default App;