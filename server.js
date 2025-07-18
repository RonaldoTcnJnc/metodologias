const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Permitir peticiones desde el frontend
app.use(cors());

// Carpeta donde se guardan los archivos subidos
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Configuración de Multer para subir archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Puedes personalizar el nombre si lo necesitas
  }
});
const upload = multer({ storage: storage });

// Endpoint para subir archivos
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ success: true, filename: req.file.originalname });
});

// Endpoint para descargar archivos
app.get('/api/download/:filename', (req, res) => {
  const filePath = path.join(uploadFolder, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
});

// Servir archivos estáticos subidos (opcional)
app.use('/uploads', express.static(uploadFolder));

// Endpoint para eliminar archivos físicamente
app.delete('/api/delete/:filename', (req, res) => {
  const filePath = path.join(uploadFolder, req.params.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});