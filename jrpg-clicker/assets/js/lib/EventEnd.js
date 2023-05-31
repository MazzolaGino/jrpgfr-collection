import Drops from "./resource/Drops.js";
import _ from "./game/GameSave.js";
import Inventory from "./Inventory.js";
import Config from "./resource/Config.js";
import Encounters from "./resource/Encounters.js";
import LevelManagement from "./tool/LevelManager.js";
import Display from "./tool/Display.js";

export default class EventEnd {

    constructor() {

        let lm = new LevelManagement();

        let save = _.getSave();
        let prevLevel = _.getSave().level;

        this.exp = lm.distributeRandomExperience();
        this.blob = this.exp * parseFloat(save.click_rate);
        this.levelUp = '';

        save.level = lm.level;
        save.exp = lm.experience;
        save.exp_next_level = lm.experienceToNextLevel;
        save.clicks = _.getClicks() + parseFloat(this.blob);

        Display.clickCount(Config.getBlobCountId(), save.clicks);
        Display.blobLevel(Config.getLevelId(), lm.level);

        if (lm.level > prevLevel) {
            this.levelUp = /* html */ `LEVEL UP ${prevLevel} > ${lm.level}`;
        }
        
        _.setSave(save);

        this.display();
    }

    display() {
        document.getElementById(Config.getAdvId()).innerHTML = /* html */ `
            <div class="uk-card-header fade-in">
                Battle End Result!  
            </div>
            <div class="uk-card-body event-end-result fade-in">
                <p>${this.levelUp}</p>
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