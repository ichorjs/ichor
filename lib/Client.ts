import VioletEmitter from "./VioletEmitter";
import restHandler from "./rest/rest.handler";
import { ClientGenome } from "./types/core";

export default class extends VioletEmitter<any> {
    public rest = new restHandler(this);

    constructor(public options: ClientGenome) {
        super();
        if (!options.token.startsWith("Bot")) {
            options.token = `Bot ${options.token}`;
        }

        this.options = Object.assign({}, options);
    }
}