import express from "express";
import path from "path";
import { setupDatabase } from './database/init';
import { apiHandler } from './routes/apiv1/index';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json());

const app = express();

const port = 3000;

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
  // Spielen -> UI Files zurückgeben
  res.send('Spiele ' + req.params.id);
});
//
app.get('/api/v1/', (req, res) => {
  apiHandler(req, res);
});

app.post('/api/v1/:name', (req, res,func) => {
  apiHandler(req, res);
});

// Statische Dateien aus dem public-Ordner bereitstellen
const publicPath = path.join(process.cwd(), 'public/browser');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
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