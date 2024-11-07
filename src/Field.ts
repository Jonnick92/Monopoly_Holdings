export class Field {
    name = '';
    type = '';
    position = 0;
    constructor(name, type, position) {
        this.name = name;
        this.type = type;
        this.position = position;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    getPosition() {
        return this.position;
    }
}