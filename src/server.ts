import express from 'express';
import { setupDatabase } from './database/init';


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

const startServer = async () => {
  try {
    await setupDatabase();
    let game_id = await create_game();
    let player_id = await create_player(game_id, 'Max', 'red', 'car');
    console.log('Game ID:', game_id);
    console.log('Player ID:', player_id);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();