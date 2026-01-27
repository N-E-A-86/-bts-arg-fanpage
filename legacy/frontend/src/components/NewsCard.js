import React from 'react';
import { Link } from 'react-router-dom'; // <-- Importa Link
import './NewsCard.css'; // Asegúrate de tener este CSS si aún no lo tienes

const NewsCard = ({ news }) => {
    return (
        <div className="news-card">
            {news.imageUrl && (
                <img src={news.imageUrl} alt={news.title} className="news-image" />
            )}
            <h3>
                {/* Enlaza el título a la página de detalle */}
                <Link to={`/news/${news._id}`} className="news-title-link">
                    {news.title}
                </Link>
            </h3>
            <p>{news.content.substring(0, 150)}...</p> {/* Muestra un extracto */}
            <span className="news-date">
                {new Date(news.date).toLocaleDateString()}
            </span>
            {/* Puedes añadir un botón "Leer Más" si quieres */}
            <Link to={`/news/${news._id}`} className="read-more">
                Leer más
            </Link>
        </div>
    );
};

export default NewsCard;