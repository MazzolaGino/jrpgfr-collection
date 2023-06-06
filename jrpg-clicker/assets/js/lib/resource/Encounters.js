import Adv from "../Adv.js"; 
import EventStart from "../EventStart.js";
import LevelManagement from "../tool/LevelManager.js";

export default class Encounters {


    static generateStart(level) {
        return new EventStart(level);
    }


    static generateAdv() {
        let lm = new LevelManagement();
        let monster = lm.distributeRandomMonster();
        return new Adv('adv-clicker', {
            hp: lm.distributeRandomHp(),
            adv: `<img src="assets/img/monsters/1 (${monster}).png">`
        });
    }

    static bstop(eventStart) {
        clearInterval(eventStart.interval);
    }
}