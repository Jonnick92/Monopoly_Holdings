import "./Player.js";
import "./Holding.js";
import "./Field.js";
import "./Property.js";
import "./Extra.js";


export class GameLogic {
    constructor() {
        this.dice = [1, 1];
        this.players = [];
        this.player_count = 0;
        this.current_player = null;
        this.holdings = [];
        this.fields = [];
        this.properties = {};
    }

    generateFields() {
        console.log('Test');
        fetch('./Properties.txt').then(response => response.text()).then(text => console.log(text));

    }
}

console.log("Test");
var test = new GameLogic;
test.generateFields();