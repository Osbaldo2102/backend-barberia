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

//Actualizar una cita existente
app.put('/api/citas/:id', (req, res) => {
  const citaId = parseInt(req.params.id);
  const { cliente, fecha, hora, servicio } = req.body;

  const cita = citas.find(c => c.id === citaId);

  if (!cita) {
    return res.status(404).json({
      message: 'Cita no encontrada'
    });
  }

  if (!cliente || !fecha || !hora || !servicio) {
    return res.status(400).json({
      message: 'Todos los campos son obligatorios'
    });
  }

  cita.cliente = cliente;
  cita.fecha = fecha;
  cita.hora = hora;
  cita.servicio = servicio;

  res.json({
    message: 'Cita actualizada correctamente',
    cita
  });
});

app.delete('/api/citas/:id', (req, res) => {
  const citaId = parseInt(req.params.id);

  const index = citas.findIndex(c => c.id === citaId);

  if (index === -1) {
    return res.status(404).json({ message: "Cita no encontrada"});
  }

  citas.splice(index, 1);

  res.json({ message: "Cita eliminada correctamente"});
});