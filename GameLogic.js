import {Player, InsufficientFundsException} from "./Player.js";
import {Holding} from "./Holding.js";
import {Field} from "./Field.js";
import {Property} from "./Property.js";
import {Extra} from "./Extra.js";


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
        fetch('./Properties.json').then(response => response.text()).then(text => {
            let raw_fields = JSON.parse(text); 
            console.log(raw_fields);

            for (let i = 0; i < raw_fields["fields"].length; ++i) {
                let field = raw_fields["fields"][i]
                switch (field["type"]) {
                    case "extras":
                        this.fields.push(new Extra(field["name"], field["action_type"], field["action"], field["position"]));
                        continue;
                    case "property":
                        this.fields.push(new Property(field["name"], field["price"], field["price_of_house"], field["rents"], field["mortgage"], field["group"], field["position"]));
                        continue;
                    default:
                        this.fields.push(new Extra(field["name"], field["type"], field["action"], field["position"]));
                }
            }
        });
        return 0;
    }

    getFields() {
        return this.fields;
    }
}

var test = new GameLogic;
test.generateFields();
console.log(test.getFields());