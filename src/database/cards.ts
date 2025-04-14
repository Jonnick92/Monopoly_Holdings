// Weitere aus dem offiziellen Monopoly Spiel hinzufügen?
// Häufigkeit der Karten muss noch berücksichtigt werden

enum CardType {
    money_bank,
    money_players,
    move_to,
    move_to_next_train_station,
    move,
    prison,
    no_prison,
    renovation,
    redraw_choice,
}

class Card {
    asset_id: number;
    type: CardType;
    value?: number | string;
    house?: number;
    hotel?: number;

    constructor(id: number, type: CardType, value?: number | string, house?: number, hotel?: number) {
        this.asset_id = id;
        this.type = type;
        this.value = value;
        this.house = house;
        this.hotel = hotel;
    }

    do_action(player: any, game: any) {
        switch (this.type) {
            case CardType.money_bank:
                break;
            case CardType.money_players:
                break;
            case CardType.move_to:
                break;
            case CardType.move_to_next_train_station:
                break;
            case CardType.move:
                break;
            case CardType.prison:
                break;
            case CardType.no_prison:
                break;
            case CardType.renovation:
                break;
            case CardType.redraw_choice:
                break;
            default:
                throw new Error(`Unknown card type: ${this.type}`);
        }
    }
}


export const COMMUNITY_CARDS: Card[] = [
    new Card(1, CardType.prison),
    new Card(2, CardType.money_bank, 100),
    new Card(3, CardType.money_bank, 200),
    new Card(4, CardType.money_bank, 20),
    new Card(5, CardType.money_bank, 100),
    new Card(6, CardType.money_bank, 10),
    new Card(7, CardType.move_to, "Badstraße"),
    new Card(8, CardType.money_bank, -50),
    new Card(9, CardType.money_bank, 25),
    new Card(10, CardType.no_prison),
    new Card(11, CardType.redraw_choice, -10),
    new Card(12, CardType.move_to_next_train_station),
    new Card(13, CardType.move_to, "Los"),
    new Card(14, CardType.money_bank, -100),
    new Card(15, CardType.money_bank, 50),
    new Card(16, CardType.money_players, 10),
];

export const EVENT_CARDS: Card[] = [
    new Card(17, CardType.move_to, "Los"),
    new Card(18, CardType.money_bank, -150),
    new Card(19, CardType.renovation, 0, 40, 115),
    new Card(20, CardType.money_bank, 150),
    new Card(21, CardType.money_players, -50),
    new Card(22, CardType.move_to, "Opernplatz"),
    new Card(23, CardType.money_bank, 100),
    new Card(24, CardType.move_to, "Schloßallee"),
    new Card(25, CardType.move, -3),
    new Card(26, CardType.prison),
    new Card(27, CardType.money_bank, -15),
    new Card(28, CardType.money_bank, 50),
    new Card(29, CardType.move_to, "Seestraße"),
    new Card(30, CardType.move_to, "Südbahnhof"),
    new Card(31, CardType.no_prison),
    new Card(32, CardType.renovation, 0, 25, 100),
]