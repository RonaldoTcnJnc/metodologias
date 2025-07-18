import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import RegistrarUsuario from './RegistrarUsuario';
import IniciarSesion from './IniciarSesion';
// Cambia la ruta del import - intenta con estas opciones:
import logoUnsaac from './assets/logo-unsaac.png';
import Informacion from './Informacion';

console.log('Logo path:', logoUnsaac);

const PortafolioDocente = () => {
  const cerrarLogin = () => {
    setShowLogin(false);
  };

  const cerrarRegistro = () => {
    setShowRegistro(false);
  };
  const [showHelp, setShowHelp] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { usuarioActual } = useContext(AuthContext);

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleRegister = () => {
    setShowRegistro(true);
  };

  // Soluciona el error: toggleHelp is not defined
  const toggleHelp = () => {
    setShowHelp((prev) => !prev);
  };
  return (
    <div style={styles.container}>
      {/* Header diagonal con logo y título - SIEMPRE VISIBLE */}
      <div style={styles.header}>
        <div style={styles.headerOverlay}></div>
        <div style={styles.headerContent}>
          {/* Título a la izquierda */}
          <div style={styles.titleSection}>
            <h1 style={styles.title}>Portafolio de Docente</h1>
          </div>
          {/* Logo a la derecha */}
          <div style={styles.logoSection}>
            <img 
              src={logoUnsaac} 
              alt="Logo" 
              style={styles.logoImage}
              onError={(e) => {
                console.error('Error cargando imagen:', e);
                console.log('Ruta intentada:', logoUnsaac);
                e.target.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Imagen cargada correctamente');
                console.log('Ruta exitosa:', logoUnsaac);
              }}
            />
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={styles.content}>
        {usuarioActual ? (
          // Si está autenticado, mostrar la ventana de información
          <Informacion usuario={usuarioActual} onRegistrarUsuario={handleRegister} />
        ) : !showRegistro && !showLogin ? (
          // Pantalla inicial con botones
          <>
            <h2 style={styles.welcomeText}>Bienvenido al Portafolio Virtual</h2>
            <div style={styles.buttonsContainer}>
              <button onClick={handleLogin} style={styles.mainButton}>
                Iniciar Sesión
              </button>
              <button onClick={handleRegister} style={styles.mainButton}>
                Registrarse
              </button>
            </div>
          </>
        ) : showLogin ? (
          // Pantalla de login
          <div style={styles.formContainer}>
            <button onClick={cerrarLogin} style={styles.backButton}>
              ← Volver
            </button>
            <IniciarSesion onLoginSuccess={() => setShowLogin(false)} />
          </div>
        ) : (
          // Pantalla de registro
          <div style={styles.formContainer}>
            <button onClick={cerrarRegistro} style={styles.backButton}>
              ← Volver
            </button>
            <RegistrarUsuario />
          </div>
        )}
      </div>

      {/* Botón flotante de registrar usuario solo visible en Iniciar Sesión y si no está autenticado */}
      {showLogin && !usuarioActual && (
        <div style={registerStyles.registerContainer}>
          <button
            onClick={() => {
              setShowRegistro(true);
              setShowLogin(false);
            }}
            style={registerStyles.registerButton}
          >
            <div style={registerStyles.registerIcon}>+</div>
          </button>
          <div style={registerStyles.registerText}>
            <div>Registrar</div>
            <div>Usuario</div>
          </div>
        </div>
      )}

      {/* Botón de ayuda flotante */}
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
              ¿Necesitas ayuda con el portafolio? Contacta con soporte técnico.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

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
  header: {
    background: '#FFC107',
    height: '200px',
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #FFC107 0%, #FFC107 50%, #4a2c2a 50%, #4a2c2a 100%)',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    zIndex: 1,
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '60px',
    paddingRight: '0',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 2,
  },
  titleSection: {
    zIndex: 2,
    marginLeft: '40px',
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
    justifyContent: 'flex-end',
    marginLeft: '60px',
    marginRight: '160px',
    paddingRight: '0',
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
  welcomeText: {
    fontSize: '60px',
    fontWeight: '400',
    color: '#333',
    textAlign: 'center',
    marginBottom: '100px',
    fontFamily: 'serif',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    alignItems: 'center',
  },
  mainButton: {
    background: '#8B4513',
    color: 'white',
    fontWeight: '400',
    padding: '18px 60px',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '20px',
    minWidth: '250px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)',
    fontFamily: 'serif',
  },
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backButton: {
    background: '#6c757d',
    color: 'white',
    fontWeight: '400',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '30px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(108, 117, 125, 0.3)',
    fontFamily: 'serif',
    alignSelf: 'flex-start',
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
    background: '#8B4513',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '70px',
    height: '70px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.4)',
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
    color: '#8B4513',
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

// Estilos para el botón flotante de registrar usuario
const registerStyles = {
  registerContainer: {
    position: 'fixed',
    bottom: '40px',
    left: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1000,
  },
  registerButton: {
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
    fontSize: '32px',
    fontWeight: 'bold',
  },
  registerIcon: {
    fontSize: '32px',
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#333',
    fontWeight: '500',
    lineHeight: '1.2',
  },
};

export default PortafolioDocente;