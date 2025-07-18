import React, { createContext, useState } from 'react';

// Creamos el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(null);

  // Función para iniciar sesión
  const login = (usuario) => {
    setUsuarioActual(usuario);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUsuarioActual(null);
  };

  return (
    <AuthContext.Provider value={{ usuarioActual, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
