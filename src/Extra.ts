import {Field} from "./Field";

export class Extra extends Field {
    actions: any;
    constructor(name, action_type, actions, position) {
        super(name, action_type, position)
        this.actions = actions;
    }

    getActions() {
        return this.actions;
    }
}