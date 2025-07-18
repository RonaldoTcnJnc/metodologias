import React, { useState } from 'react';
import logoUnsaac from './assets/logo-unsaac.png';

const RegistrarUsuario = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleRegister = () => {
    if (codigo && nombre && email && contrasena) {
      alert(`Usuario registrado: ${nombre} (${codigo})`);
    } else {
      alert('Por favor complete todos los campos');
    }
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div style={styles.container}>
      

      {/* Contenido principal - Formulario de Registro */}
      <div style={styles.content}>
        <h2 style={styles.registerTitle}>Registro de Usuario</h2>
        
        <div style={styles.formContainer}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Ingrese su Código:</label>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              style={styles.input}
              placeholder="Código UNSAAC"
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre completo:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={styles.input}
              placeholder="Ingrese su nombre completo"
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Ingrese su Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="correo@unsaac.edu.pe"
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña:</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={styles.input}
              placeholder="Cree una contraseña segura"
            />
          </div>
          
          <button onClick={handleRegister} style={styles.registerButton}>
            Registrar Usuario
          </button>
        </div>
      </div>

      {/* Botón de ayuda flotante (idéntico al diseño original) */}
      <div style={styles.helpContainer}>
        <button onClick={toggleHelp} style={styles.helpButton}>
          <div style={styles.helpIcon}>?</div>
        </button>
        <div style={styles.helpText}>
          <div>Dudas y</div>
          <div>Consultas</div>
        </div>
        {showHelp && (
          <div style={styles.helpTooltip}>
            <h3 style={styles.tooltipTitle}>Dudas y Consultas</h3>
            <p style={styles.tooltipText}>
              ¿Necesitas ayuda con el registro? Contacta con soporte técnico.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Estilos idénticos al componente original
const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    background: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    position: 'relative',
  },
 
  titleSection: {
    zIndex: 2,
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#4a2c2a',
    margin: '0',
    lineHeight: '1.1',
    fontFamily: 'serif',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  logoSection: {
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '260px',
    height: '260px',
    objectFit: 'contain',
  },
  content: {
    flex: 1,
    padding: '40px 60px 40px',
    background: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - 200px)',
  },
  registerTitle: {
    fontSize: '36px',
    fontWeight: '400',
    color: '#4a2c2a',
    textAlign: 'center',
    ttom: '40px',
    fontFamily: 'serif',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    fontSize: '18px',
    fontWeight: '400',
    color: '#4a2c2a',
    marginBottom: '8px',
    fontFamily: 'serif',
  },
  input: {
    padding: '12px 16px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff9e6',
    outline: 'none',
    fontFamily: 'serif',
    transition: 'border-color 0.3s ease',
  },
  registerButton: {
    background: '#4a2c2a',
    color: 'white',
    fontWeight: '400',
    padding: '15px 40px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '18px',
    width: '100%',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(74, 44, 42, 0.3)',
    fontFamily: 'serif',
    marginTop: '10px',
  },
  helpContainer: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  helpButton: {
    background: '#4a2c2a',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '70px',
    height: '70px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(74, 44, 42, 0.4)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  helpIcon: {
    fontSize: '28px',
    fontWeight: 'bold',
  },
  helpText: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#333',
    fontWeight: '500',
    lineHeight: '1.2',
  },
  helpTooltip: {
    position: 'absolute',
    bottom: '100px',
    right: '0',
    background: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    border: '1px solid #ddd',
    maxWidth: '250px',
    width: '250px',
  },
  tooltipTitle: {
    fontWeight: '600',
    color: '#4a2c2a',
    marginBottom: '8px',
    fontSize: '14px',
  },
  tooltipText: {
    color: '#666',
    fontSize: '12px',
    margin: '0',
    lineHeight: '1.4',
  },
};

export default RegistrarUsuario;