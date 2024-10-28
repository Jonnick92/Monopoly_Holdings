export class InsufficientFundsException extends Error {
    constructor(message) {
        super(message);
        this.name = "Insufficient Funds Exception"
    }
}

export class Player {
    constructor(name = 'player', icon_color = [null, 0xffffff]) {
        this.name = name;
        this.icon_color = icon_color;
        this.type = 'player';
        this.balance = 1500;
        this.current_field = 0;
        this.prison = 0;
        this.owned_properties = [];
        this.owned_shares = [];
        this.net_worth = this.balance
    }

    moneyAction(amount) {
        if (this.getBalance < (-amount)) throw InsufficientFundsException("Player " + this.getName() + "has insufficient funds!");

        this.balance += amount;
    }

    buyProperty(property) {
        this.moneyAction(property.getPrice());
        this.addProperty(property)
    }

    addProperty(property) {
        this.owned_properties.unshift(property);
    }

    removeProperty(property) {
        for (let i = 0; i < this.getOwnedProperties.length; ++i) {
            if (property == this.getOwnedProperties[i]) {
                this.owned_properties.splice(i, 1);
                break;
            }
        }
    }

    move(toField) {
        this.current_field = toField;
    }

    getName() {
        return this.name;
    }

    getIconColor() {
        return this.icon_color;
    }

    getType() {
        return this.type;
    }

    getBalance() {
        return this.balance;
    }

    getCurrentField() {
        return this.current_field;
    }

    getPrison() {
        return this.prison;
    }

    getOwnedProperties() {
        return this.owned_properties;
    }

    getOwnedShares() {
        return this.owned_shares;
    }

    getNetWorth() {
        // needs function to calculate net worth based on owned properties and shares and current balance
        return this.balance;
    }

    setPrison(duration) {
        this.prison = duration;
    }
}