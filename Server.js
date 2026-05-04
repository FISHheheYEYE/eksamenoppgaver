const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const DATA_FILE = path.join(__dirname, 'profile.json');

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Profil.HTML'));
});

function readProfile() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  return {
    bio: 'Hei! Jeg er Ola, 18 år gammel. Jeg elsker gaming, musikk og sport. Jeg spiller mye dataspill og hører på musikk hele tiden. Sport er også en stor del av livet mitt, spesielt fotball.',
    interests: ['🎮 Gaming', '🎵 Musikk', '⚽ Sport']
  };
}

app.get('/profile', (req, res) => {
  res.json(readProfile());
});

app.post('/profile', (req, res) => {
  const profile = req.body;
  fs.writeFileSync(DATA_FILE, JSON.stringify(profile, null, 2));
  res.json({ status: 'saved', profile });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});