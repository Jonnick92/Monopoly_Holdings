import { Field } from "./Field";

export class Extra extends Field {
    constructor(name, action_type, actions) {
        super(name, action_type)
        this.actions = actions;
    }

    getActions() {
        return this.actions;
    }
}