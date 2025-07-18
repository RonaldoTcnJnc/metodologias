import React from 'react';
import { AuthProvider } from './AuthContext';
import PortafolioDocente from './PortafolioDocente';
import IniciarSesion from './IniciarSesion';
import Informacion from './Informacion';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <PortafolioDocente />
      </div>
    </AuthProvider>
  );
}

export default App;