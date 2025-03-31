import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/player', (req, res) => {
  // Spieler aufsetzen, Name, Farbe, Figur etc.
});

app.get('/create_game', (req, res) => {
  // Spiel erstellen, Spieler hinzufügen, Regeln einstellen?
});

app.get('/games', (req, res) => {
  // Laufende Spiele anzeigen
});

app.get('/play/:id', (req, res) => {
  // Spielen
});

app.get('/api/v1/:name', (req, res) => {
  res.send('API is working!, ' + req.params.name);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});