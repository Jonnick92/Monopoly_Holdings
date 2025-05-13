# Monopoly_Holdings in TypeScript with Database and nice UI and idk and nice yeah

## How to run the project

1. Clone the repository
2. Install the dependencies using `npm install` or `npm update`
3. Build the Typescript files using `npm run build`
4. Start the Server with `npm start`

## Infos

### Altes UI Framework

[Phaser 3.51.0](https://cdn.jsdelivr.net/npm/phaser@3.51.0/dist/phaser-arcade-physics.min.js)
[Input Plugin](https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js)

### Hardcoded Positionen

const field_grid = [[2780,1970,4,-1,-1],[2580,1970,0,0,-1],[2423,1970,0,0,-1],[2260,1970,0,0,-1],[2092,1970,0,0,-1],[1925,1970,0,0,-1],[1760,1970,0,0,-1],[1595,1970,0,0,-1],[1420,1970,0,0,-1],[1250,1970,0,0,-1],[995,1990,0,1,-1],[1015,1740,0,1,0],[1015,1580,0,1,0],[1015,1420,0,1,0],[1015,1260,0,1,0],[1015,1100,0,1,0],[1015,940,0,1,0],[1015,775,0,1,0],[1015,610,0,1,0],[1015,440,0,1,0],[1050,235,0,1,1],[1250,200,0,0,1],[1420,200,0,0,1],[1595,200,0,0,1],[1760,200,0,0,1],[1925,200,0,0,1],[2092,200,0,0,1],[2260,200,0,0,1],[2423,200,0,0,1],[2580,200,0,0,1],[2780,235,0,-1,1],[2800,440,0,-1,0],[2800,610,0,-1,0],[2800,775,0,-1,0],[2800,940,0,-1,0],[2800,1100,0,-1,0],[2800,1260,0,-1,0],[2800,1420,0,-1,0],[2800,1580,0,-1,0],[2800,1740,0,-1,0],[995,1990,1,-1,0]]
this.board = this.add.image(1920 + center_offset,1080,'bg');

## TODO

### Zu Beachten

- Bei Würfeln Paschs beachten
- Holdings bekommen einen Geldwert den sie halten, alles darüber wird am Ende der Runde ausgeschüttet

### Logik

#### Backend

- Spielstart ( erster Spieler, Setup etc)
- Main Game Loop
  - Aktueller Spieler / Spielzug Aktion
  - Würfeln
    - Pasch Handling
  - Bewegen
  - Feld Aktion
  - Spieler Bankrott
  - Gefängniss
  - Event / Community Karten
- Loading vom Game, Player etc
- API Calls
- API Validation
- Verification?
- Shares einer Holding ( 100 Shares -> keine drittel verteilung möglich ...)

#### Frontend

- Würfel starten
- Trade Infos mit anderen Spielern
  - Trade vorschläge an Backend schicken
- Holding / Player Views

### UI

#### Seiten im alten

- GameView -> Feld Übersicht
- MainMenu -> Startseite
- UsrDetail -> Eigenen Benutzer bearbeiten (farbe etc)
- PlayerMenu -> Benutzer in einem Game ansehen / bearbeiten / erstellen
- PropertyMenu -> Besitztümer eines Spielers ansehen / bearbeiten (mortgage, Häuser kaufen etc)
- TradeManager -> Trade Vorschläge erstellen
- PropertyManager -> Einzelnes Property anschauen & bearbeiten? (vllt useless)
- HoldingCreator -> Holding erstellen (~ ähnlich wie Trade Manager, also vorschlag machen den die anderen dann bestätigen oder abändern können)
- Auctioneer -> Auktion eines nicht gekauften Feldes

#### Dazu neue UI Szenen

- Spiel Erstellung -> Neues Spiel erstellen
- Spiel Overview -> alle laufenden anzeigen

### Later

- Implementierung von Security Sachen wie eindeutiger Player Erkennung
- Spectator Modus
- Logging von allen Spiel Aktionen