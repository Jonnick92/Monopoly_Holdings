import {Player, InsufficientFundsException} from "./Player";

export class Holding extends Player {
    balance: number;
    min_balance: number;
    owners: any[];
    paymode: string;

    constructor(name, balance, min_balance, paymode) {
        super(name);
        this.balance = balance;
        this.min_balance = min_balance
        this.owners = []
        this.paymode = paymode;
    }

    payout() {
        var excess = this.balance - this.min_balance;
        for (let i = 0; i < this.owners.length && excess > 0; ++i) {
            this.owners[i][0].moneyAction(Math.round(excess * (this.owners[i][1] / 100)));
        }
    }


    addOwner(player, percentage) {
        // Check whether player is already a shareholder
        for (let i = 0; i < this.owners.length; ++i){
            if (player == this.owners[i][0]) {
                this.manageOwner(player, percentage, i);
                return;
            }
        }
        this.owners.unshift([player, percentage]);
    }


    // in case the index of the player that is to be managed is already known, see addOwner()
    manageOwner(player, percentage, index = null) {
        if (index != null) {
            this.owners[index][1] += percentage;
            return;
        }

        for (let i = 0; i < this.owners.length; ++i) {
            if (this.owners[i][0] == player) {

                // check whether to remove player or not
                if (this.owners[i][1] + percentage <= 0) {
                    this.removeOwner(player, i);
                    return;
                }

                this.owners[i][1] = (this.owners[i][1] + percentage >= 100) ? 100 : this.owners[i][1] + percentage;
                return;
            }
        }

        // if player was not found in owners, check whether to add player
        if (percentage < 0) this.addOwner(player, percentage);
    }


    // in case the index of the player that is to be removed is already known, see manageOwner()
    removeOwner(player, index = null) {
        if (index != null) {
            this.owners.splice(index, 1);
            return;
        }

        for (let i = 0; i < this.owners.length; ++i) {
            if (this.owners[i][0] == player) {
                this.owners.splice(i, 1);
            }
        }
    }
    
    getMinBalance() {
        return this.min_balance;
    }

    getOwners() {
        return this.owners;
    }
}