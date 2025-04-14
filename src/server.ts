import express from 'express';
import {setupDatabase} from './database/init';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/player', (req, res) => {
  // Spieler aufsetzen, Name, Farbe, Figur etc.
  res.send('Spieler aufsetzen:');
});

app.get('/create_game', (req, res) => {
  // Spiel erstellen, Spieler hinzufügen, Regeln einstellen?
  res.send('Spiel erstellen:');
});

app.get('/games', (req, res) => {
  // Laufende Spiele anzeigen
  res.send('Laufende Spiele:');
});

app.get('/play/:id', (req, res) => {
  // Spielen
  res.send('Spiele ' + req.params.id);
});

app.get('/api/v1/:name', (req, res) => {
  res.send('API is working!, ' + req.params.name);
});

app.listen(port, () => {
  setupDatabase();
  console.log(`Server is running on http://localhost:${port}`);
});