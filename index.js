const express = require("express");
const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Storage en memoria para las citas
let citas = [];
let nextId = 1;

// Prueba de ruta
app.get('/', (req, res) => {
  res.send('API de Barbería funcionando');
});


// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Obtener todas las citas
app.get('/api/citas', (req, res) => {
  res.json(citas);
});

// Crear una nueva cita
app.post('/api/citas', (req, res) => {
  const { cliente, fecha, hora, servicio } = req.body;

  if (!cliente || !fecha || !hora || !servicio) {
    return res.status(400).json({
      message: 'Todos los campos son obligatorios'
    });
  }

  const nuevaCita = {
    id: nextId++,
    cliente,
    fecha,
    hora,
    servicio
  };

  citas.push(nuevaCita);

  res.status(201).json(nuevaCita);
});