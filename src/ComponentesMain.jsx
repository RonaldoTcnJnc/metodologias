import React, { useState } from 'react';
// Cambia la ruta del import - intenta con estas opciones:
import logoUnsaac from './assets/logo-unsaac.png';
// Si la anterior no funciona, prueba con:
// import logoUnsaac from './assets/logo-unsaac.png';
// O con:
// import logoUnsaac from '/src/assets/logo-unsaac.png';

// OPCIÓN 2: Si tu imagen está en public/, usa esta línea en su lugar:
// const logoUnsaac = '/logo-unsaac.png';

// Para debugging - verifica que la imagen se cargue
console.log('Logo path:', logoUnsaac);

const PortafolioDocente = () => {
  const [showHelp, setShowHelp] = useState(false);

  const handleLogin = () => {
    alert('Funcionalidad de Iniciar Sesión');
  };

  const handleRegister = () => {
    alert('Funcionalidad de Registro');
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div style={styles.container}>
      {/* Header diagonal con logo y título */}
      <div style={styles.header}>
        <div style={styles.headerTriangle}></div>
        <div style={styles.welcomeText}>
          Portafolio de<br />
          <span style={styles.teacherName}>Docente</span>
        </div>
        <div style={styles.logo}>
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
              console.log('✅ Imagen cargada correctamente');
              console.log('Ruta exitosa:', logoUnsaac);
            }}
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div style={styles.content}>
        <h2 style={styles.welcomeText}>Bienvenido al Portafolio Virtual</h2>
        
        <div style={styles.buttonsContainer}>
          <button onClick={handleLogin} style={styles.mainButton}>
            Iniciar Sesión
          </button>
          
          <button onClick={handleRegister} style={styles.mainButton}>
            Registrarse
          </button>
        </div>
      </div>

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
    padding: '40px 60px',
    height: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 2,
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
    width: '180px',
    height: '180px',
    objectFit: 'contain',
  },
  content: {
    flex: 1,
    padding: '60px 60px 40px',
    background: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  welcomeText: {
    fontSize: '32px',
    fontWeight: '400',
    color: '#333',
    textAlign: 'center',
    marginBottom: '60px',
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



export default PortafolioDocente;