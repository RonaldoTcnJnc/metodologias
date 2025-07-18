import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import logoUnsaac from './assets/logo-unsaac.png'; // Asegúrate de tener la imagen en esta ruta
import { validarUsuario } from './utilsUsuarios';
import { obtenerUsuarios } from './utilsUsuarios';

const IniciarSesion = ({ onLoginSuccess }) => {
  const { login } = useContext(AuthContext);
  const [usuariosVisibles, setUsuariosVisibles] = useState([]);
  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };
  const handleForgotPassword = () => {
    alert('Funcionalidad de recuperar contraseña');
  };
  const [showHelp, setShowHelp] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = () => {
    if (codigo && contrasena) {
      const resultado = validarUsuario(codigo, contrasena);
      if (resultado.ok) {
        login(resultado.usuario);
        setCodigo('');
        setContrasena('');
      } else {
        alert(resultado.mensaje);
      }
    } else {
      alert('Por favor complete todos los campos');
    }
  };


  const handleMostrarUsuarios = () => {
    const usuarios = obtenerUsuarios();
    if (usuarios.length === 0) {
      alert('No hay usuarios registrados.');
      setUsuariosVisibles([]);
    } else {
      setUsuariosVisibles(usuarios);
    }
  };

  return (
    <div style={styles.container}>
      {/* Resto del componente permanece igual */}
      <div style={styles.content}>
        <h2 style={styles.loginTitle}>Inicie Sesión</h2>
        <div style={styles.formContainer}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Código:</label>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              style={styles.input}
              placeholder="Ingrese su código"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña:</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={styles.input}
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div style={styles.forgotPassword}>
            <button onClick={handleForgotPassword} style={styles.forgotLink}>
              Olvidé la contraseña
            </button>
          </div>
          <button onClick={handleLogin} style={styles.loginButton}>
            Acceder
          </button>
          <button onClick={handleMostrarUsuarios} style={{...styles.loginButton, background:'#8B4513', marginTop:'10px'}}>
            Mostrar usuarios registrados
          </button>
          {usuariosVisibles.length > 0 && (
            <div style={{marginTop:'20px', background:'#fff9e6', border:'1px solid #ddd', borderRadius:'8px', padding:'16px', maxWidth:'400px'}}>
              <h3 style={{color:'#4a2c2a', fontSize:'18px', marginBottom:'10px'}}>Usuarios registrados:</h3>
              <ul style={{listStyle:'none', padding:0, margin:0}}>
                {usuariosVisibles.map((u, idx) => (
                  <li key={idx} style={{marginBottom:'8px', color:'#333', fontSize:'15px'}}>
                    <strong>Código:</strong> {u.codigo} <br/>
                    <strong>Nombre:</strong> {u.nombre || '(sin nombre)'} <br/>
                    <strong>Email:</strong> {u.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
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
  // ... (los demás estilos permanecen exactamente iguales)
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
  loginTitle: {
    fontSize: '36px',
    fontWeight: '400',
    color: '#4a2c2a',
    marginBottom: '30px',
    fontFamily: 'serif',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
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
  forgotPassword: {
    alignSelf: 'flex-start',
    marginTop: '-15px',
  },
  forgotLink: {
    background: 'none',
    border: 'none',
    color: '#4a2c2a',
    fontSize: '14px',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontFamily: 'serif',
  },
  loginButton: {
    background: '#4a2c2a',
    color: 'white',
    fontWeight: '400',
    padding: '15px 40px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '18px',
    minWidth: '120px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(74, 44, 42, 0.3)',
    fontFamily: 'serif',
  },
  registerContainer: {
    position: 'fixed',
    bottom: '40px',
    left: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

export default IniciarSesion;