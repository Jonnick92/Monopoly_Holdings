import {Field} from "./Field.js";

export class Extra extends Field {
    constructor(name, action_type, actions, position) {
        super(name, action_type, position)
        this.actions = actions;
    }

    getActions() {
        return this.actions;
    }
}