import React, { useState } from 'react';
import logoUnsaac from './assets/logo-unsaac.png';


// Componentes de iconos simples usando SVG
const Eye = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const Upload = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17,8 12,3 7,8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const Download = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17,10 12,15 7,10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const ChevronDown = ({ size = 20, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
    <polyline points="6,9 12,15 18,9"/>
  </svg>
);

const ChevronUp = ({ size = 20, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
    <polyline points="18,15 12,9 6,15"/>
  </svg>
);

// Icono de eliminar (basurero)
const Trash = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const Informacion = ({ usuario, onRegistrarUsuario }) => {
  // Estado para secciones generales editable
  const [secciones, setSecciones] = useState([
    { id: 'caratula', nombre: 'Carátula', hasDocument: true, documentName: 'caratula.pdf' },
    { id: 'curriculum', nombre: 'Curriculum Vitae', hasDocument: true, documentName: 'cv.pdf' },
    { id: 'carga', nombre: 'Carga Académica', hasDocument: true, documentName: 'carga_academica.pdf' },
    { id: 'filosofia', nombre: 'Filosofía Docente', hasDocument: true, documentName: 'filosofia.pdf' }
  ]);

  const [activeTab, setActiveTab] = useState('informacion');
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [cursos, setCursos] = useState([
    {
      id: 'curso1',
      nombre: 'CURSO 1',
      documentos: [
        { id: 'silabo', nombre: 'Sílabo', hasDocument: true, documentName: 'silabo_curso1.pdf' },
        { id: 'registro', nombre: 'Registro de entrega del sílabo', hasDocument: false, documentName: null },
        { id: 'avance', nombre: 'Avance', hasDocument: true, documentName: 'avance_curso1.pdf' }
      ]
    }
  ]);
  // Eliminar curso
  const handleEliminarCurso = (cursoId) => {
    if (window.confirm('¿Seguro que deseas eliminar este curso?')) {
      setCursos(cursos.filter(c => c.id !== cursoId));
    }
  };

  // Eliminar documento de un curso
  const handleEliminarDocumento = (cursoId, docId) => {
    setCursos(cursos.map(c =>
      c.id === cursoId
        ? {
            ...c,
            documentos: c.documentos.filter(d => d.id !== docId)
          }
        : c
    ));
  };
  // Eliminar archivo de información general (frontend y backend)
  const handleEliminarArchivoSeccion = async (seccionId) => {
    const seccion = secciones.find(s => s.id === seccionId);
    if (!seccion || !seccion.hasDocument || !seccion.documentName) return;
    if (window.confirm('¿Seguro que deseas eliminar este archivo?')) {
      // Eliminar en backend
      try {
        const res = await fetch(`http://localhost:5000/api/delete/${encodeURIComponent(seccion.documentName)}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success) {
          setSecciones(prevSecciones => prevSecciones.map(s =>
            s.id === seccionId
              ? { ...s, hasDocument: false, documentName: null }
              : s
          ));
        } else {
          alert('No se pudo eliminar el archivo en el servidor');
        }
      } catch (err) {
        alert('Error de red al eliminar el archivo');
      }
    }
  };
  // Botón de cerrar sesión solo en esta ventana
  const handleCerrarSesion = () => {
    // Aquí puedes agregar la lógica para cerrar sesión, por ejemplo:
    if (typeof window !== 'undefined') {
      window.location.reload(); // Simula cerrar sesión recargando la app
    }
  };
  // Inicia edición del nombre del curso al hacer doble click
  const handleCourseNameDoubleClick = (courseId, currentName) => {
    setEditingCourseId(courseId);
    setEditingCourseName(currentName);
  };

  // Guarda el nuevo nombre del curso
  const handleCourseNameChange = (e) => {
    setEditingCourseName(e.target.value);
  };

  const handleCourseNameBlur = (courseId) => {
    setCursos(cursos.map(c => c.id === courseId ? { ...c, nombre: editingCourseName } : c));
    setEditingCourseId(null);
    setEditingCourseName("");
  };
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingCourseName, setEditingCourseName] = useState("");
  // Función para ver documento (general para secciones y documentos de cursos)
  const handleViewDocument = (item) => {
    if (item.hasDocument && item.documentName) {
      window.open(`http://localhost:5000/uploads/${encodeURIComponent(item.documentName)}`, '_blank');
    } else {
      alert(`No hay documento disponible para ${item.nombre}`);
    }
  };
  // Permite agregar un documento a un curso
  const handleAgregarDocumento = (cursoId) => {
    const nombre = prompt('Nombre del nuevo documento:');
    if (!nombre) return;
    setCursos(cursos.map(c =>
      c.id === cursoId
        ? {
            ...c,
            documentos: [
              ...c.documentos,
              {
                id: `doc${c.documentos.length + 1}`,
                nombre,
                hasDocument: false,
                documentName: null
              }
            ]
          }
        : c
    ));
  };

  // Subir archivo al backend y actualizar estado para secciones generales
  const handleFileUpload = (seccionId) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.doc,.docx';
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        try {
          const res = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          if (data.success) {
            alert(`Archivo subido: ${data.filename}`);
            // Actualizar estado para marcar el documento como disponible en cursos
            setCursos(prevCursos => prevCursos.map(c => ({
              ...c,
              documentos: c.documentos.map(d =>
                d.id === seccionId
                  ? { ...d, hasDocument: true, documentName: data.filename }
                  : d
              )
            })));
            // Actualizar estado para secciones generales
            setSecciones(prevSecciones => prevSecciones.map(s =>
              s.id === seccionId
                ? { ...s, hasDocument: true, documentName: data.filename }
                : s
            ));
          } else {
            alert('Error al subir el archivo');
          }
        } catch (err) {
          alert('Error de red al subir el archivo');
        }
      }
    };
    fileInput.click();
  };

  // Descargar archivo del backend
  const handleDownloadDocument = (seccion) => {
    if (seccion.hasDocument && seccion.documentName) {
      window.open(`http://localhost:5000/api/download/${encodeURIComponent(seccion.documentName)}`, '_blank');
    } else {
      alert(`No hay documento disponible para descargar en ${seccion.nombre}`);
    }
  };

  const toggleCourse = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  // Permite agregar un curso
  const handleAgregarCurso = () => {
    const nuevoId = `curso${cursos.length + 1}`;
    const nuevoCurso = {
      id: nuevoId,
      nombre: `CURSO ${cursos.length + 1}`,
      documentos: [
        { id: 'silabo', nombre: 'Sílabo', hasDocument: false, documentName: null },
        { id: 'registro', nombre: 'Registro de entrega del sílabo', hasDocument: false, documentName: null },
        { id: 'avance', nombre: 'Avance', hasDocument: false, documentName: null }
      ]
    };
    setCursos([...cursos, nuevoCurso]);
  };

  return (
    <div style={styles.container}>
      {/* Título de bienvenida con el nombre de usuario */}
      <h2 style={{
        fontSize: '38px',
        fontWeight: 'bold',
        color: '#4a2c2a',
        textAlign: 'center',
        margin: '40px 0 20px 0',
        fontFamily: 'serif',
      }}>
        Bienvenido{usuario && usuario.nombre ? `, ${usuario.nombre}` : ''}
      </h2>

      {/* Botón flotante de cerrar sesión en la esquina inferior derecha */}
      <button
        style={{
          position: 'fixed',
          bottom: 32,
          left: 32,
          background: '#4a2c2a',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '16px 32px',
          fontWeight: 'bold',
          fontSize: '18px',
          boxShadow: '0 4px 16px rgba(74,44,42,0.18)',
          cursor: 'pointer',
          zIndex: 2000,
        }}
        onClick={handleCerrarSesion}
      >
        Cerrar sesión
      </button>

      {/* Navegación por pestañas */}
      <div style={styles.tabContainer}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'informacion' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => setActiveTab('informacion')}
        >
          Información General
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'cursos' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => setActiveTab('cursos')}
        >
          Mis Cursos
        </button>
      </div>

      {/* Contenido principal */}
      <div style={styles.contentArea}>
        {activeTab === 'informacion' && (
          <div style={styles.sectionsContainer}>
            {secciones.map((seccion) => (
              <div key={seccion.id} style={styles.sectionCard}>
                <div style={styles.sectionContent}>
                  <span style={styles.sectionName}>{seccion.nombre}</span>
                  <div style={styles.sectionActions}>
                    <button
                      style={{
                        ...styles.actionButton,
                        ...(seccion.hasDocument ? styles.activeButton : styles.inactiveButton)
                      }}
                      onClick={() => handleViewDocument(seccion)}
                      title="Ver documento"
                    >
                      <Eye size={18} />
                    </button>
                    <div style={styles.uploadDownloadContainer}>
                      <button
                        style={styles.actionButton}
                        onClick={() => handleFileUpload(seccion.id)}
                        title="Cargar documento"
                      >
                        <Upload size={18} />
                      </button>
                      <button
                        style={{
                          ...styles.actionButton,
                          ...(seccion.hasDocument ? styles.activeButton : styles.inactiveButton)
                        }}
                        onClick={() => handleDownloadDocument(seccion)}
                        title="Descargar documento"
                      >
                        <Download size={18} />
                      </button>
                      {/* Botón eliminar archivo de sección */}
                      <button
                        style={{ ...styles.actionButton, color: '#c0392b' }}
                        onClick={() => handleEliminarArchivoSeccion(seccion.id)}
                        title="Eliminar archivo"
                        disabled={!seccion.hasDocument}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cursos' && (
          <div style={styles.coursesContainer}>
            <button onClick={handleAgregarCurso} style={{marginBottom: '16px', alignSelf: 'flex-start', background: '#4a2c2a', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 18px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px'}}>
              + Agregar curso
            </button>
            {cursos.map((curso) => (
              <div key={curso.id} style={styles.courseSection}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div 
                    style={{...styles.courseHeader, flex: 1}}
                    onClick={() => toggleCourse(curso.id)}
                  >
                    {editingCourseId === curso.id ? (
                      <input
                        type="text"
                        value={editingCourseName}
                        autoFocus
                        onChange={handleCourseNameChange}
                        onBlur={() => handleCourseNameBlur(curso.id)}
                        style={{
                          ...styles.courseName,
                          background: '#fff',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#333',
                          outline: 'none',
                          width: '60%',
                        }}
                      />
                    ) : (
                      <span
                        style={styles.courseName}
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          handleCourseNameDoubleClick(curso.id, curso.nombre);
                        }}
                        title="Doble click para editar"
                      >
                        {curso.nombre}
                      </span>
                    )}
                    {expandedCourse === curso.id ? 
                      <ChevronUp size={20} style={styles.chevron} /> : 
                      <ChevronDown size={20} style={styles.chevron} />
                    }
                  </div>
                  {/* Botón eliminar curso */}
                  <button
                    onClick={() => handleEliminarCurso(curso.id)}
                    style={{
                      background: '#c0392b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '14px',
                      marginLeft: '12px',
                    }}
                    title="Eliminar curso"
                  >
                    Eliminar
                  </button>
                </div>
                
                {expandedCourse === curso.id && (
                  <div style={styles.courseDocuments}>
                    {curso.documentos.map((documento) => (
                      <div key={documento.id} style={styles.documentCard}>
                        <div style={styles.documentContent}>
                          <span style={styles.documentName}>{documento.nombre}</span>
                          <div style={styles.sectionActions}>
                            <button
                              style={{
                                ...styles.actionButton,
                                ...(documento.hasDocument ? styles.activeButton : styles.inactiveButton)
                              }}
                              onClick={() => handleViewDocument(documento)}
                              title="Ver documento"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              style={styles.actionButton}
                              onClick={() => handleFileUpload(documento.id)}
                              title="Cargar documento"
                            >
                              <Upload size={18} />
                            </button>
                            <button
                              style={{
                                ...styles.actionButton,
                                ...(documento.hasDocument ? styles.activeButton : styles.inactiveButton)
                              }}
                              onClick={() => handleDownloadDocument(documento)}
                              title="Descargar documento"
                            >
                              <Download size={18} />
                            </button>
                            {/* Botón eliminar documento como cuarta opción */}
                            <button
                              onClick={() => handleEliminarDocumento(curso.id, documento.id)}
                              style={{
                                ...styles.actionButton,
                                color: '#c0392b',
                              }}
                              title="Eliminar documento"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Botón para agregar documento */}
                    <button
                      onClick={() => handleAgregarDocumento(curso.id)}
                      style={{
                        margin: '18px 0 0 0',
                        background: '#8B4513',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 18px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '15px',
                        alignSelf: 'flex-start',
                      }}
                    >
                      + Agregar documento
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  // Estilos para el modal de registro
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  modalContent: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    padding: '32px 24px 24px 24px',
    minWidth: '350px',
    maxWidth: '95vw',
    maxHeight: '95vh',
    position: 'relative',
    overflowY: 'auto',
  },
  closeModalButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: '#4a2c2a',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    fontSize: '22px',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(74,44,42,0.18)',
  },
  container: {
    minHeight: '100vh',
    background: 'none',
    fontFamily: 'serif',
    margin: 0,
    padding: 0,
    width: '100vw',
    boxSizing: 'border-box',
  },
  welcomeSection: {
    background: "url('data:image/svg+xml;utf8,<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 950 175\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"0,0 950,0 950,60 0,175\" fill=\"#FFC107\"/><polygon points=\"950,0 950,175 0,175 950,60\" fill=\"#260507\"/></svg>')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: '40px 60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '175px',
    width: '100vw',
    margin: 0,
    boxSizing: 'border-box',
  },
  welcomeTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#4a2c2a',
    margin: '0',
    lineHeight: '1.2',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholder: {
    width: '200px',
    height: '140px',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4a2c2a',
    marginBottom: '5px',
  },
  logoSubtext: {
    fontSize: '10px',
    color: '#4a2c2a',
    lineHeight: '1.2',
    marginBottom: '8px',
  },
  logoYears: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#4a2c2a',
  },
  tabContainer: {
    display: 'flex',
    background: 'transparent',
    boxShadow: 'none',
    width: '90vw',
    maxWidth: '1400px',
    margin: '2vh auto 0 auto',
    boxSizing: 'border-box',
  },
  tab: {
    padding: '15px 30px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '22px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    fontFamily: 'serif',
    textAlign: 'center',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    background: '#4a2c2a',
    color: 'white',
    borderRadius: '16px',
    boxShadow: 'none',
  },
  inactiveTab: {
    background: '#8B4513',
    color: 'white',
    borderRadius: '16px',
    marginLeft: '5px',
    boxShadow: 'none',
  },
  contentArea: {
    padding: '0',
    background: '#fff',
    minHeight: '600px',
    border: '4px solid #4a2c2a',
    borderRadius: '12px',
    margin: '2vh auto',
    width: '90vw',
    maxWidth: '1400px',
    boxSizing: 'border-box',
    display: 'block',
  },
  sectionsContainer: {
    padding: '24px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    width: '100%',
    boxSizing: 'border-box',
  },
  sectionCard: {
    background: '#e9e9e9',
    borderRadius: '12px',
    padding: '0',
    border: 'none',
    boxShadow: 'none',
    marginBottom: '8px',
    width: '100%',
    maxWidth: '1100px',
    alignSelf: 'center',
    boxSizing: 'border-box',
  },
  sectionContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 18px',
    minHeight: '40px',
    borderBottom: '1px solid #d1d1d1',
  },
  sectionName: {
    fontSize: '16px',
    fontWeight: '400',
    color: '#333',
    flex: 1,
  },
  sectionActions: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  uploadDownloadContainer: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },
  actionButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
  },
  activeButton: {
    color: '#666',
    opacity: 1,
  },
  inactiveButton: {
    color: '#666',
    opacity: 1,
  },
  emptyState: {
    padding: '60px 30px',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: '18px',
    color: '#666',
    fontStyle: 'italic',
  },
  coursesContainer: {
    padding: '24px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    width: '100%',
    boxSizing: 'border-box',
  },
  courseSection: {
    background: '#e9e9e9',
    borderRadius: '12px',
    border: 'none',
    overflow: 'hidden',
    padding: '0',
    boxShadow: 'none',
    width: '100%',
    maxWidth: '1100px',
    alignSelf: 'center',
    boxSizing: 'border-box',
    marginBottom: '8px',
  },
  courseHeader: {
    background: '#e9e9e9',
    padding: '12px 18px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '12px 12px 0 0',
    fontWeight: 'bold',
    fontSize: '18px',
    borderBottom: '1px solid #d1d1d1',
    transition: 'background-color 0.3s ease',
  },
  courseHeaderHover: {
    background: '#dee2e6',
  },
  courseName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
  },
  chevron: {
    color: '#666',
  },
  courseDocuments: {
    background: '#fff',
    padding: '0',
    borderRadius: '0 0 12px 12px',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  documentCard: {
    padding: '0 18px',
    borderBottom: '1px solid #f1f1f1',
    background: '#fff',
  },
  documentContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 0',
  },
  documentName: {
    fontSize: '14px',
    fontWeight: '400',
    color: '#333',
    flex: 1,
  },

};

export default Informacion;