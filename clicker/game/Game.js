import clickerInstance from "../clicker-system/Clicker.js";
import _ from "../tools/Save.js"

export default class Game {

    constructor() {
        this.minions = JSON.parse(_.get('minions'));
        this.inventory = JSON.parse(_.get('inventory'));
        this.clicker = clickerInstance;
    }

    addMinion(minion) {
        this.minions.push(minion);
        _.set('minions', JSON.stringify(this.minions));
    }


}