abstract class Field {
    position: number;
    name: string;
    constructor(pos: number, name: string) {
        this.position = pos;
        this.name = name;
    }

    is_property(): boolean {
        return false;
    }
    is_event_field(): boolean {
        return false;
    }
    is_community_field() {
        return false;
    }
    is_train_station(): boolean {
        return false;
    }
    is_provider(): boolean {
        return false;
    }
    is_prison(): boolean {
        return false;
    }

    get_position(): number {
        return this.position;
    }

    get_name(): string {
        return this.name;
    }

    abstract on_land_on(player: any): void;
}

abstract class MortgageableField extends Field {
    price: number;
    mortgaged: boolean;

    constructor(pos: number, name: string, price: number) {
        super(pos, name);
        this.price = price;
        this.mortgaged = false;
    }

    mortgage_value(): number {
        return this.price / 2;
    }

    unmortgage_price(): number {
        return this.mortgage_value() * 1.1;
    }

    is_mortgaged(): boolean {
        return this.mortgaged;
    }

    set_mortgage(mortgage: boolean): void {
        this.mortgaged = mortgage;
    }

    abstract calculate_rent(player: any): number;
}

class Property extends MortgageableField {
    price_of_house: number;
    rents: number[];
    color: string;

    constructor(pos: number, name: string, price: number, price_of_house: number, rents: number[], color: string) {
        super(pos, name, price);
        this.price_of_house = price_of_house;
        this.rents = rents;
        this.color = color;
    }

    is_property(): boolean {
        return true;
    }

    on_land_on(player: any): void {
        
    }

    calculate_rent(): number {
        return 0;
    }
}

class TrainStation extends MortgageableField {

    constructor(pos: number, name: string) {
        super(pos, name, 200);
    }

    is_train_station(): boolean {
        return true;
    }

    on_land_on(player: any): void {
        
    }

    calculate_rent(player: any): number {
        let base_rent = 25;
        for (let field of player.get_properties()) {
            if (field.is_train_station() 
                && field.get_position() !== this.get_position()) {
                base_rent *= 2;
            }
        }

        return base_rent;
    }
}

class Provider extends MortgageableField {
    constructor(pos: number, name: string) {
        super(pos, name, 150);
    }

    is_provider(): boolean {
        return true;
    }

    on_land_on(player: any): void {
        
    }

    calculate_rent(): number {
        return 0;
    }
}

class ActionField extends Field {
    action: string;

    constructor(pos: number, name: string, action: string) {
        super(pos, name);
        this.action = action;
    }

    on_land_on(player: any): void {
        
    }
}

class EventField extends ActionField {
    is_event_field(): boolean {
        return true;
    }

    on_land_on(player: any): void {
        
    }
}

class CommunityField extends ActionField {
    is_community_field(): boolean {
        return true;
    }

    on_land_on(player: any): void {
        
    }
}

export const GAME_FIELD: Field[] = [
    new ActionField(0, 'Los', 'Los'),
    new Property(1, 'Badstraße', 60, 50, [2, 10, 30, 90, 160, 250], 'brown'),
    new CommunityField(2, 'Community Field', 'Community'),
    new Property(3, 'Turmstraße', 60, 50, [4, 20, 60, 180, 320, 450], 'brown'),
    new ActionField(4, 'Income Tax', 'Income Tax'),
    new TrainStation(5, 'Südbahnhof'),
    new Property(6, 'Chauseestraße', 100, 50, [6, 30, 90, 270, 400, 550], 'baby blue'),
    new EventField(7, 'Event Field', 'Event'),
    new Property(8, 'Elisenstraße', 100, 50, [6, 30, 90, 270, 400, 550], 'baby blue'),
    new Property(9, 'Poststraße', 120, 50, [8, 40, 100, 300, 450, 600], 'baby blue'),
    new ActionField(10, 'Prison', 'Prison'),
    new Property(11, 'Seestraße', 140, 100, [10, 50, 150, 450, 625, 750], 'pink'),
    new Provider(12, 'Elektrizitätswerk'),
    new Property(13, 'Hafenstraße', 140, 100, [10, 50, 150, 450, 625, 750], 'pink'),
    new Property(14, 'Neue Straße', 160, 100, [12, 60, 180, 500, 700, 900], 'pink'),
    new TrainStation(15, 'Westbahnhof'),
    new Property(16, 'Münchener Straße', 180, 100, [14, 70, 200, 550, 750, 950], 'orange'),
    new CommunityField(17, 'Community Field', 'Community'),
    new Property(18, 'Wiener Straße', 180, 100, [14, 70, 200, 550, 750, 950], 'orange'),
    new Property(19, 'Berliner Straße', 200, 100, [16, 80, 220, 600, 800, 1000], 'orange'),
    new ActionField(20, 'Frei Parken', 'Frei Parken'),
    new Property(21, 'Theaterstraße', 220, 150, [18, 90, 250, 700, 875, 1050], 'red'),
    new EventField(22, 'Event Field', 'Event'),
    new Property(23, 'Museumstraße', 220, 150, [18, 90, 250, 700, 875, 1050], 'red'),
    new Property(24, 'Opernplatz', 240, 150, [20, 100, 300, 750, 925, 1100], 'red'),
    new TrainStation(25, 'Nordbahnhof'),
    new Property(26, 'Lessingstraße', 260, 150, [22, 110, 330, 800, 975, 1150], 'yellow'),
    new Property(27, 'Schillerstraße', 260, 150, [22, 110, 330, 800, 975, 1150], 'yellow'),
    new Provider(28, 'Wasserwerk'),
    new Property(29, 'Goethestraße', 280, 150, [24, 120, 360, 850, 1025, 1200], 'yellow'),
    new ActionField(30, 'Goto Prison', 'Goto Prison'),
    new Property(31, 'Rathausplatz', 300, 200, [26, 130, 390, 900, 1100, 1275], 'green'),
    new Property(32, 'Hauptstraße', 300, 200, [26, 130, 390, 900, 1100, 1275], 'green'),
    new CommunityField(33, 'Community Field', 'Community'),
    new Property(34, 'Bahnhofstraße', 320, 200, [28, 150, 450, 1000, 1200, 1400], 'green'),
    new TrainStation(35, 'Hauptbahnhof'),
    new EventField(36, 'Event Field', 'Event'),
    new Property(37, 'Parkstraße', 350, 200, [35, 175, 500, 1100, 1300, 1500], 'blue'),
    new ActionField(38, 'Additional Tax', 'Additional Tax'),
    new Property(39, 'Schlossallee', 400, 200, [50, 200, 600, 1400, 1700, 2000], 'blue'),
]