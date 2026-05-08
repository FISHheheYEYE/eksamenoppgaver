require('dotenv').config();
const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_NAME = process.env.DB_NAME || 'eksamenoppgaver';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: Number(process.env.DB_PORT || 3306),
  multipleStatements: true
};

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let pool;

async function initDatabase() {
  const rootConnection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port,
    multipleStatements: true
  });

  const escapedDbName = mysql.escapeId(DB_NAME);
  await rootConnection.query(`CREATE DATABASE IF NOT EXISTS ${escapedDbName}`);
  await rootConnection.end();

  pool = mysql.createPool({
    ...dbConfig,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS profile (
      id INT PRIMARY KEY,
      bio TEXT,
      interests TEXT
    )
  `);

  const [rows] = await pool.query('SELECT id FROM profile WHERE id = 1');
  if (rows.length === 0) {
    await pool.query(
      'INSERT INTO profile (id, bio, interests) VALUES (1, ?, ?)',
      [
        'Hei! Jeg er Ola, 18 år gammel. Jeg elsker gaming, musikk og sport. Jeg spiller mye dataspill og hører på musikk hele tiden. Sport er også en stor del av livet mitt, spesielt fotball.',
        '🎮 Gaming|🎵 Musikk|⚽ Sport'
      ]
    );
  }
}

// ─── Page routes ────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'hjem.html'));
});

app.get('/hjem', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'hjem.html'));
});

app.get('/profil', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'profil.html'));
});

app.get('/melding', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'melding.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

// ─── API routes ──────────────────────────────────────────────────────────────

app.get('/api/profile', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT bio, interests FROM profile WHERE id = 1');
    if (rows.length === 0) {
      return res.json({ bio: '', interests: [] });
    }
    const row = rows[0];
    res.json({
      bio: row.bio || '',
      interests: row.interests ? row.interests.split('|') : []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/profile', async (req, res) => {
  const { bio, interests } = req.body;
  if (typeof bio !== 'string' || !Array.isArray(interests)) {
    return res.status(400).json({ error: 'Ugyldig profildata' });
  }
  try {
    await pool.query('UPDATE profile SET bio = ?, interests = ? WHERE id = 1', [bio, interests.join('|')]);
    res.json({ status: 'saved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── Start ───────────────────────────────────────────────────────────────────

async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    process.exit(1);
  }
}

startServer();