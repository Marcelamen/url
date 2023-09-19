// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar middleware
app.use(express.json());
app.use(cors());

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost/tu_basedatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('Error de conexión a la base de datos:', error));
db.once('open', () => console.log('Conexión a la base de datos exitosa'));

// Definir un modelo para tus URL
const UrlSchema = new mongoose.Schema({
  url: String,
  descripcion: String,
});

const Url = mongoose.model('Url', UrlSchema);

// Rutas para manejar las URL
app.post('/api/url', async (req, res) => {
  try {
    const urlData = req.body;
    const newUrl = new Url(urlData);
    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (error) {
    console.error('Error al guardar la URL:', error);
    res.status(500).json({ error: 'Error al guardar la URL' });
  }
});

app.get('/api/urls', async (req, res) => {
  try {
    const urls = await Url.find();
    res.status(200).json(urls);
  } catch (error) {
    console.error('Error al obtener las URLs:', error);
    res.status(500).json({ error: 'Error al obtener las URLs' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
