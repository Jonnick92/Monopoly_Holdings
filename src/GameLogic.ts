import {Player, InsufficientFundsException} from "./Player";
import {Holding} from "./Holding";
import {Field} from "./Field";
import {Property} from "./Property";
import {Extra} from "./Extra";


export class GameLogic {
    dice: number[];
    players: Player[];
    player_count: number;
    current_player: Player;
    holdings: Holding[];
    fields: any;
    properties: {};

    constructor() {
        this.dice = [1, 1];
        this.players = [];
        this.player_count = 0;
        this.current_player = null;
        this.holdings = [];
        this.fields = this.generateFields();
        this.properties = {};
    }

    generateFields() {
        fetch('./Properties.json').then(response => response.text()).then(text => {
            let final_fields = []
            let raw_fields = JSON.parse(text); 

            for (let i = 0; i < raw_fields["fields"].length; ++i) {
                let field = raw_fields["fields"][i]
                switch (field["type"]) {
                    case "extras":
                        final_fields.push(new Extra(field["name"], field["action_type"], field["action"], field["position"]));
                        continue;
                    case "property":
                        final_fields.push(new Property(field["name"], field["price"], field["price_of_house"], field["rents"], field["mortgage"], field["group"], field["position"]));

                        //add Properties to the property dictionary
                        if (this.properties[field["group"]]) {
                            this.properties[field["group"]].push(final_fields[final_fields.length - 1]);
                        } else {
                            this.properties[field["group"]] = [final_fields[final_fields.length - 1]];
                        }

                        continue;
                    default:
                        final_fields.push(new Extra(field["name"], field["type"], field["action"], field["position"]));
                }
            }
            return final_fields;
        });
        return 0;
    }

    addPlayer(name, icon_color) {
        this.players.push(new Player(name, icon_color));
    }

    removePlayer(player) {
        for (let i = 0; i < this.players.length; ++i) {
            if (player == this.players[i]) {
                this.players.splice(i, 1);
                return;
            }
        }
    }

    fieldAction() {
        if (this.fields[this.current_player.getCurrentField()].getType() != 'property') this.quickAction(this.fields[this.current_player.getCurrentField()]);
        else {
            if(this.fields[this.current_player.getCurrentField()].getOwner() == null) {
                //Kaufen
                //Integration mit UI überlegen
            } else {
                //Miete Zahlen
                //Integration mit UI überlegen
            }
        }
    }

    quickAction(field) {
        switch (field.getType()) {
            case "sma":
                try {
                    this.current_player.moneyAction(field.getAction());
                    return;
                }
                catch {InsufficientFundsException} {
                    //deal with it, I don't know how yet
                    return;
                }
            
            case "com":;
            case "eve":
                this.cardAction(field.getType());
                return;
            case "prison":
                this.current_player.move(40);
                this.current_player.setPrison(3);
                return;
            case "inprison":
                this.prisonManagement();
                return;
            case "none": return;
            default: return;
        }
    }

    prisonManagement() {
        //UI Management: Bail out? -> Roll dice 3x -> Pasch? -> reduce Prison by 1
    }

    cardAction(cardType) {

    }

    rollDice() {
        this.dice = [Math.max(1, Math.floor(Math.random() * 7)), Math.max(1, Math.floor(Math.random() * 7))];
    }

    getFields() {
        return this.fields;
    }

    getProperties() {
        return this.properties;
    }
}

var test = new GameLogic();
console.log(test.getProperties());