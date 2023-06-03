import Adv from "../Adv.js"; 
import EventStart from "../EventStart.js";
import LevelManagement from "../tool/LevelManager.js";

export default class Encounters {


    static generateStart() {
        let evt = new EventStart();
    }


    static generateAdv(eventStart) {
        let lm = new LevelManagement();
        let monster = lm.distributeRandomMonster();
        return new Adv(eventStart, 'adv-clicker', {
            hp: lm.distributeRandomHp(),
            adv: `<img src="assets/img/monsters/1 (${monster}).png">`
        });
    }
}