import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Vamos a crear este Contexto más adelante

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth(); // Función de login del contexto de autenticación

    // Redireccionar si el usuario ya está logueado (opcional, pero buena UX)
    // useEffect(() => {
    //     if (localStorage.getItem('userInfo')) { // Esto se basaría en un item en localStorage
    //         navigate('/'); // Redirigir a la página principal
    //     }
    // }, [navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null); // Limpiar errores previos

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/login`,
                { email, password },
                config
            );

            // Guardar la información del usuario y el token (usando el contexto de autenticación)
            login(data); // Llama a la función login del contexto
            localStorage.setItem('userInfo', JSON.stringify(data)); // Guarda también en localStorage

            navigate('/'); // Redireccionar a la página principal o dashboard

        } catch (err) {
            console.error('Error en el inicio de sesión:', err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Credenciales inválidas. Inténtalo de nuevo.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Iniciar Sesión</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={submitHandler} className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;