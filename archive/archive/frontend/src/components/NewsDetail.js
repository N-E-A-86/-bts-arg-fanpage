// ESTE ES EL CONTENIDO COMPLETO Y FUNCIONAL DE NewsDetail.js que REEMPLAZA al placeholder
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el ID de la URL
import axios from 'axios';
import './NewsDetail.css'; // Asegúrate de crear este archivo CSS en la misma carpeta

const NewsDetail = () => {
    const { id } = useParams(); // Obtiene el ID de la noticia de la URL
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                setError(null); // Limpiar errores anteriores
 
// ESTA ES LA LÍNEA QUE DEBES ESCRIBIR EN NewsDetail.js
const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/${id}`);
setNews(response.data);

            } catch (err) {
                console.error('Error al cargar la noticia:', err);
                setError('No se pudo cargar la noticia. Inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]); // El efecto se vuelve a ejecutar si el ID cambia

    if (loading) {
        return <div className="news-detail-container">Cargando noticia...</div>;
    }

    if (error) {
        return <div className="news-detail-container error-message">{error}</div>;
    }

    if (!news) {
        return <div className="news-detail-container">Noticia no encontrada.</div>;
    }

    return (
        <div className="news-detail-container">
            <h1 className="news-detail-title">{news.title}</h1>
            <p className="news-detail-meta">
                Publicado por {news.author} el {new Date(news.date).toLocaleDateString()}
            </p>
            {news.imageUrl && (
                <img src={news.imageUrl} alt={news.title} className="news-detail-image" />
            )}
            <div className="news-detail-content">
                <p>{news.content}</p>
            </div>
        </div>
    );
};

export default NewsDetail;