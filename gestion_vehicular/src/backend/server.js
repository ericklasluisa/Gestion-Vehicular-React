// backend/server.js
const express = require('express');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'gestion_vehicular',
  password: 'gestion_vehicular',
  database: 'gestion_vehicular'
});

const app = express();

// Endpoint para obtener datos de la base de datos
app.get('/data', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM table');
    conn.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener datos de la base de datos' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
