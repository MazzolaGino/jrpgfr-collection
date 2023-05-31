import Drops from "./resource/Drops.js";
import _ from "./game/GameSave.js";
import Inventory from "./Inventory.js";
import Config from "./resource/Config.js";
import Encounters from "./resource/Encounters.js";
import LevelManagement from "./tool/LevelManager.js";

export default class EventEnd {

    constructor() {

        let lm = new LevelManagement();

        let save = _.getSave();
        let drops = new Drops();
        let item = drops.generate('I');

        this.exp = lm.distributeRandomExperience();
        this.blob = this.exp * parseFloat(save.click_rate);

        _.setInventoryItem(item);
        let vItem = Inventory.add(item);
        this.item = vItem;

        save.level = lm.level;
        save.exp = lm.experience;
        save.exp_next_level = lm.experienceToNextLevel;

        _.setSave(save);

        console.log(_.getSave());

        this.display();
    }

    calculateExp() {

        return Math.pow(adv_base, level * difficulty);
    }

    display() {
        document.getElementById(Config.getAdvId()).innerHTML = /* html */ `
            <div class="uk-card-header fade-in">
                Battle End Result! 
            </div>
            <div class="uk-card-body event-end-result fade-in">
                <p>Item: ${this.item}</p>
                <p>Exp: ${this.exp}</p>
                <p><img class="icon" src="assets/img/icons/S_Water07.png"> x ${this.blob} </p>
                <p><button class="uk-button uk-button-default" id="${Config.getEventEndButtonId()}">Continue...</button></p>
            </div>
        `;

        document.getElementById(Config.getEventEndButtonId()).addEventListener('click', (event) => {
            Encounters.generateAdv();
        })
    }

}