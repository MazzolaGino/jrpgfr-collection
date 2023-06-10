import Adv from "../Adv.js"; 
import EventStart from "../EventStart.js";
import LevelManagement from "../tool/LevelManager.js";

export default class Encounters {



    static generateStart() {
        return new EventStart();
    }


    static generateAdv() {

        let lm = new LevelManagement();
        let monster = lm.distributeRandomMonster();
        return new Adv('adv-clicker', {
            hp: lm.distributeRandomHp(),
            adv: `<img src="assets/img/monsters/1 (${monster}).png">`
        });
    }

    static generateBoss() {

        let lm = new LevelManagement();
        let monster = lm.distributeRandomBoss();
        return new Adv('adv-clicker', {
            hp: lm.distributeRandomBossHp(),
            adv: `<img src="assets/img/boss/boss (${monster}).png">`
        }, true);
    }

}