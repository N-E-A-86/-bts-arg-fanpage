import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Crear el contexto
const AuthContext = createContext();

// 2. Crear el Proveedor del Contexto
// Este componente envolverá a toda tu aplicación o a las partes que necesiten acceso al estado de autenticación
export const AuthProvider = ({ children }) => {
    // Cargar el usuario del localStorage al inicio
    const [user, setUser] = useState(() => {
        try {
            const userInfo = localStorage.getItem('userInfo');
            return userInfo ? JSON.parse(userInfo) : null;
        } catch (error) {
            console.error("Error al parsear userInfo de localStorage:", error);
            return null;
        }
    });

    // Función para manejar el login
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('userInfo', JSON.stringify(userData)); // Guardar en localStorage
    };

    // Función para manejar el logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo'); // Eliminar del localStorage
        // Opcional: limpiar otros estados o tokens si los hubiera
    };

    // Puedes agregar aquí más funciones relacionadas con la autenticación (ej. verificar token)

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
    return useContext(AuthContext);
};