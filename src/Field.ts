export class Field {
    name: string;
    type: string;
    position: number;
    
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