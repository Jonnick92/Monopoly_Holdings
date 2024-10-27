import "./Field.js";

export class SaleException extends Error {
    constructor(message) {
        super(message);
        this.name = "SaleException";
    }
}

export class Property extends Field {
    constructor(name, price, price_of_house, rents, mortgage){
        super(name, "prop");
        this.price = price;
        this.price_of_house = price_of_house;
        this.rents = rents;
        this.mortgage = mortgage;
        this.owner = null;
        this.state = 0;
        this.value = price;
    }

    beBought(player) {
        this.checkBuyable();
        this.owner = player;
    }

    checkBuyable() {
        if (this.state > 0) {
            throw SaleException("This Property is not eligeble for Sale! Cause: Built Houses");
        }
        return 1;
    }

    buyHouse() {
        if (this.state == 5) return 0;

        this.owner.moneyAction(-this.getPriceOfHouse());
        ++this.state;
        return 1;
    }

    sellHouse() {
        if (this.state < 0){
            this.owner.moneyAction(Math.round(this.getPriceOfHouse() / 2));
            --this.state;
            return 1;
        }
        return 0;
    }

    takeMortgage() {
        while(sellHouse);
        this.owner.moneyAction(this.getMortgage())
        this.state = -1
    }

    payBackMortgage() {
        this.owner.moneyAction(-(Math.round(this.getMortgage() * 1.1)));
        this.state = 0;
    }

    getValue() {
        // needs function to calculate accurate value based on number of houses, ownership of other properties of this group, etc.
        return this.value;
    }

    getRent() {
        // returns 0 as well as the base rent in case of mortgage, so that there can be some nice foolery with the visuals
        return (this.state == -1) ? [0, this.rents[0]] : [this.rents[this.state]];
    }

    getOwner() {
        return this.owner;
    }

    getPriceOfHouse() {
        return this.price_of_house;
    }

    getPrice() {
        return this.price;
    }

    getState() {
        return this.state;
    }
}