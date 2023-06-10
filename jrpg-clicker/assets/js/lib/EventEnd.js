import _ from "./game/GameSave.js";
import Config from "./resource/Config.js";
import Encounters from "./resource/Encounters.js";
import LevelManagement from "./tool/LevelManager.js";
import Display from "./tool/Display.js";
import NumberFormatter from "./tool/NumberFormatter.js";
import Blob from "./Blob.js";
import AdvBackground from './tool/AdvBackground.js';
import DungeonManager from "./dungeon_system/DungeonManager.js";
import Notification from "./tool/Notification.js";

export default class EventEnd {
    constructor(boss = false) {
        this.lm = new LevelManagement();

        this.previousLevel = this.lm.level; 
        this.boss = boss;
        this.initialize();
        this.updateDisplay();
        this.addEventListeners();
    }

    initialize() {
       

        this.exp = this.lm.distributeRandomExperience();
        if(this.boss === true) {
            this.exp = this.lm.distributeRandomBossExperience();
        }
        
        this.blob = this.exp / 1.5;
        this.VExp = NumberFormatter.format(this.exp);
        this.VBlob = NumberFormatter.format(this.blob);

        this.levelUp = '';

        if (this.lm.level > this.previousLevel) {
            this.levelUp = `LEVEL UP ${this.previousLevel} > ${this.lm.level}`;
        }

        let save = _.getSave();

        save.level = this.lm.level;
        save.exp = this.lm.experience;
        save.exp_next_level = this.lm.experienceToNextLevel;
        save.clicks += parseFloat(this.blob);
        save.adv_killed = parseInt(_.getSave().adv_killed) + 1;

        _.setSave(save);

        Blob.updateStatistics();
    }

    updateDisplay() {

        Display.clickCount(Config.getBlobCountId(), _.getSave().clicks);
        Display.blobLevel(Config.getLevelId(), _.getSave().level);

        document.getElementById(Config.getAdvId()).innerHTML = `
            <div class="blob-menu-header fight-start-animation">
                Battle End Result!  
            </div>
            <div class="adv-container event-end-result ${AdvBackground.get()}">
                <div class="adv-hero"><img src="assets/img/isa-deu-jumpinganim700.gif" /></div>
                <div class="battle-result">
                <p class="fight-start-animation">${this.levelUp}</p>
                <p>Exp: ${this.VExp}</p>
                <p><img class="icon" src="assets/img/icons/I_GoldCoin.png"> x ${this.VBlob} </p>
                <p><button class="uk-button uk-button-default" id="${Config.getEventEndButtonId()}">Continue...</button></p>
                </div>
            </div>
        `;
    }

    addEventListeners() {
        document.getElementById(Config.getEventEndButtonId()).addEventListener('click', (event) => {
            DungeonManager.getInstance().decrement();

            if (DungeonManager.getInstance().end() && !DungeonManager.getInstance().bossDefeated()) {

                Encounters.generateBoss();

            } else if (DungeonManager.getInstance().end() && DungeonManager.getInstance().bossDefeated()) {
                document.getElementById(Config.getAdvId()).innerHTML = `
                    <div class="blob-menu-header fight-start-animation">
                        Battle End Result!  
                    </div>
                    <div class="adv-container event-end-result ${AdvBackground.get()}">
                        <div class="adv-hero"><img src="assets/img/isa-deu-jumpinganim700.gif" /></div>
                        <div class="battle-result">
                        <p class="fight-start-animation">Congratulations, you complete the dungeon !</p>
                        <p><button class="uk-button uk-button-default" id="${Config.getUseADungeonKey()}">Use a key to continue ?</button></p>
                        </div>
                    </div>
                `;

                document.getElementById(Config.getUseADungeonKey()).addEventListener('click', (event) => {
                    
                    if (DungeonManager.getInstance().useKey()) {
                        Encounters.generateAdv();
                    } else {
                        const notif = new Notification('red', "You don't have a key...");
                        notif.show();
                    }
                });
            } else {
                Encounters.generateAdv();
            }
        });
    }
}