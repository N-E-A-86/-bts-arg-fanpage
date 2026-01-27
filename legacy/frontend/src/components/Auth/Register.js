import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redireccionar al usuario

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Para confirmar la contraseña
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate(); // Hook para la navegación

    const submitHandler = async (e) => {
        e.preventDefault(); // Previene el recargado de la página

        // Validación básica de contraseñas
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setError(null); // Limpiar errores previos
        setSuccess(null); // Limpiar mensajes de éxito previos

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/register`,
                { username, email, password },
                config
            );

            setSuccess('Registro exitoso. ¡Ahora puedes iniciar sesión!');
            // Opcional: Redireccionar automáticamente al login después de un breve retraso
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error('Error en el registro:', err);
            // Mostrar un mensaje de error más amigable
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Error en el registro. Inténtalo de nuevo.');
            }
        }
    };

    return (
        <div className="container mt-5"> {/* Clase de Bootstrap para centrar y margen */}
            <h2 className="mb-4 text-center">Registro</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={submitHandler} className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;