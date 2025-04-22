import express from 'express';
import { setupDatabase } from './database/init';
import { apiHandler } from './routes/apiv1/index';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json());

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

app.get('/api/v1/', (req, res) => {
  apiHandler(req, res);
});

app.post('/api/v1/:name', (req, res, func) => {
  apiHandler(req, res);
});

const startServer = async () => {
  try {
    await setupDatabase();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();