import Base from "./tool/Base.js";
import ClickCounter from "./counter/ClickCounter.js";
import GameObserver from "./game/GameObserver.js";
import Config from "./resource/Config.js"
import _ from "./game/GameSave.js"; 
import LevelManagement from "./tool/LevelManager.js";
import Tooltip from './tool/Tooltip.js';
import NumberFormatter from "./tool/NumberFormatter.js";
import AutoBattle from './tool/AutoBattle.js'

export default class Blob extends Base {
    
    constructor(id, data) {

        super(id, data);
        this.lm = new LevelManagement();
        this.display(); 
        this.clicker = new ClickCounter('#blob_character img', Config.getBlobCountId());
        this.clicker.subscribe(new GameObserver());
        this.clicker.updateClicks();
        this.blobClick();
    }

    
    display() {

        document.getElementById(this.id).innerHTML = /* html */ `
            <div class="blob-menu-header"><span class="Hildya">Hildya</span> <span class="HeroGold"> <img class="icon" src="assets/img/icons/I_GoldCoin.png"><span id="${Config.getBlobCountId()}"></span></span></div>
            <div class="blob-body">
                <div class="blob content-hero" id="blob_character">${this.data.blob}</div>
                <div class="hero-statistic" id="hero-statistics"></div>
            </div>
        `;
    

        Blob.updateStatistics();
        let lm = new LevelManagement();
        new Tooltip('Hildya', `📈 Exp. to next level ${NumberFormatter.format(lm.experience)}/${NumberFormatter.format(lm.calculateExperienceToNextLevel())}`); 
    }

    blobClick() {
        document.querySelector('#blob_character img').addEventListener('click', () => {
            this.clicker.increment();
        });
    }


    static updateStatistics(id = 'hero-statistics') {
        
        let lm = new LevelManagement();

        document.getElementById(id) .innerHTML = `
            <ul>
                <li id="${Config.getLevelId()}" class="levelTtp">🆙 ${lm.level}</li>
                <li class="clickRate">💥 ${NumberFormatter.format(lm.calculateClickRate())}</li>
                <li class="AutoClick">💫 ${NumberFormatter.format(lm.calculateAutoClick())}</li>
                <li class="AutoBattle">🗡 ON</li>
            </ul>
        `;

        AutoBattle.start(); 

        document.querySelector('li.AutoBattle').addEventListener('click', () => {
            if(AutoBattle.isStarted()) {
                AutoBattle.stop();
                document.querySelector('li.AutoBattle').innerHTML = '🗡 OFF';
            }else{
                AutoBattle.start();
                document.querySelector('li.AutoBattle').innerHTML = '🗡 ON';
            }
        });

        new Tooltip('levelTtp', 'The Hero Level');
        new Tooltip('clickRate', 'Damage or Harvest value');
        new Tooltip('AutoClick', 'Auto Click value');
        new Tooltip('HeroGold', 'Your gold');
        new Tooltip('AutoBattle', 'Click to activate auto battle');

        new Tooltip('Hildya', `📈 Exp. to next level ${NumberFormatter.format(lm.experience)}/${NumberFormatter.format(lm.calculateExperienceToNextLevel())}`); 
 
        

        
    }
}