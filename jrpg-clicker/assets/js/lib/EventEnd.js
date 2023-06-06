import _ from "./game/GameSave.js";
import Config from "./resource/Config.js";
import Encounters from "./resource/Encounters.js";
import LevelManagement from "./tool/LevelManager.js";
import Display from "./tool/Display.js";
import NumberFormatter from "./tool/NumberFormatter.js";
import Blob from "./Blob.js";

export default class EventEnd {

    constructor() {

        let lm = new LevelManagement();

        let save = _.getSave();
        let prevLevel = _.getSave().level;

        this.exp = lm.distributeRandomExperience();
        this.blob = this.exp/1.5;


        this.VExp = NumberFormatter.format(this.exp);
        this.VBlob = NumberFormatter.format(this.blob);
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

        Blob.updateStatistics();

        this.display();
    }

    display() {
        document.getElementById(Config.getAdvId()).innerHTML = /* html */ `
            <div class="blob-menu-header fight-start-animation">
                Battle End Result!  
            </div>
            <div class="adv-container event-end-result">
                <div class="adv-hero"><img src="assets/img/isa-deu-jumpinganim700.gif" /></div>
                <div class="battle-result">
                    <p class="fight-start-animation">${this.levelUp}</p>
                    <p>Exp: ${this.VExp}</p>
                    <p><img class="icon" src="assets/img/icons/I_GoldCoin.png"> x ${this.VBlob} </p>
                    <p><button class="uk-button uk-button-default" id="${Config.getEventEndButtonId()}">Continue...</button></p>
                </div>
            </div>
        `;

        document.getElementById(Config.getEventEndButtonId()).addEventListener('click', (event) => {
            Encounters.generateAdv();
        })
    }

}