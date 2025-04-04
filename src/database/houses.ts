class property {
    constructor(name, price, price_of_house, rents, mortgage, color) {
        this.name = name
        this.price = price
        this.price_of_house = price_of_house
        this.rents = rents
        this.mortgage = mortgage
        this.state = 0
        this.owner = null
        this.color = color
        this.type = 'prop'
    }
    
}

class extras {
    constructor(name, action, type) {
        this.name = name
        this.action = action
        this.type = type
    }
}

const fields = [
    new extras('Los', 200, 'sma'),
    new property('Badstraße', 60, 50, [2, 10, 30, 90, 160, 250], 30, 'brown'),
    new extras('Community Field', 0, 'com'),
    new property("Turmstraße", 60, 50, [4, 20, 60, 180, 320, 450], 30, 'brown'),
    new extras('Income Tax', -200, 'sma'),
    new property('Südbahnhof', 200, 0, [25, 50, 100, 200], 100, 'stations'),
    new property("Chauseestraße", 100, 50, [6, 30, 90, 270, 400, 550], 50, 'baby blue'),
    new extras('Event Field', 0, 'eve'),
    new property("Elisenstraße", 100, 50, [6, 30, 90, 270, 400, 550], 50, 'baby blue'),
    new property("Poststraße", 120, 50, [8, 40, 100, 300, 450, 600], 60, 'baby blue'),
    new extras('default', 0),
    new property("Seestraße", 140, 100, [10, 50, 150, 450, 625, 750], 70, 'pink'),
    new property('Elektrizitätswerk', 150, 0, [4, 10], 75, 'providers'),
    new property('Hafenstraße', 140, 100, [10, 50, 150, 450, 625, 750], 70, 'pink'),
    new property('Neue Straße', 160, 100, [12, 60, 180, 500, 700, 900], 80, 'pink'),
    new property('Westbahnhof', 200, 0, [25, 50, 100, 200], 100, 'stations'),
    new property('Münchener Straße', 180, 100, [14, 70, 200, 550, 750, 950], 90, 'orange'),
    new extras('Community Field', 0, 'com'),
    new property('Wiener Straße', 180, 100, [14, 70, 200, 550, 750, 950], 90, 'orange'),
    new property('Berliner Straße', 200, 100, [16, 80, 220, 600, 800, 1000], 100, 'orange'),
    new extras('default', 0),
    new property('Theaterstraße', 220, 150, [18, 90, 250, 700, 875, 1050], 110, 'red'),
    new extras('Event Field', 0, 'eve'),
    new property('Museumstraße', 220, 150, [18, 90, 250, 700, 875, 1050], 110, 'red'),
    new property('Opernplatz', 240, 150, [20, 100, 300, 750, 925, 1100], 120, 'red'),
    new property('Nordbahnhof', 200, 0, [25, 50, 100, 200], 100, 'stations'),
    new property('Lessingstraße', 260, 150, [22, 110, 330, 800, 975, 1150], 130, 'yellow'),
    new property('Schillerstraße', 260, 150, [22, 110, 330, 800, 975, 1150], 130, 'yellow'),
    new property('Wasserwerk', 150, 0, [4, 10], 75, 'providers'),
    new property('Goethestraße', 280, 150, [24, 120, 360, 850, 1025, 1200], 140, 'yellow'),
    new extras('prison', 0, 'prison'),
    new property('Rathausplatz', 300, 200, [26, 130, 390, 900, 1100, 1275], 150, 'green'),
    new property('Hauptstraße', 300, 200, [26, 130, 390, 900, 1100, 1275], 150, 'green'),
    new extras('Community Field', 0, 'com'),
    new property('Bahnhofstraße', 320, 200, [28, 150, 450, 1000, 1200, 1400], 160, 'green'),
    new property('Hauptbahnhof', 200, 0, [25, 50, 100, 200], 100, 'stations'),
    new extras('Event Field', 0, 'eve'),
    new property('Parkstraße', 350, 200, [35, 175, 500, 1100, 1300, 1500], 175, 'blue'),
    new extras('Some other tax', -100, 'sma'),
    new property('Schlossallee', 400, 200, [50, 200, 600, 1400, 1700, 2000], 200, 'blue'),
    new extras('prison', 0)
]

var properties = {
    'brown': [fields[1], fields[3]],
    'baby blue': [fields[6], fields[8], fields[9]],
    'pink': [fields[11], fields[13], fields[14]],
    'orange': [fields[16], fields[18], fields[19]],
    'red': [fields[21], fields[23], fields[24]],
    'yellow': [fields[26], fields[27], fields[29]],
    'green': [fields[31], fields[32], fields[34]],
    'blue': [fields[37], fields[39]],
    'stations': [fields[5], fields[15], fields[25], fields[35]],
    'providers': [fields[12], fields[28]]
}