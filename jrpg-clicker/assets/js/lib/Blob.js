import Base from "./tool/Base.js";
import ClickCounter from "./counter/ClickCounter.js";
import GameObserver from "./game/GameObserver.js";
import Config from "./resource/Config.js"
import _ from "./game/GameSave.js";
import Map from "./Map.js";
import LevelManagement from "./tool/LevelManager.js";
import Tooltip from './tool/Tooltip.js';
import NumberFormatter from "./tool/NumberFormatter.js";

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
            
            <div class="blob-menu-header">
                <img class="icon" src="assets/img/icons/I_GoldCoin.png"><span id="${Config.getBlobCountId()}"></span>
                <span id="${Config.getLevelId()}"></span>
            </div>

            <div class="blob-body">
                <div class="blob content-hero" id="blob_character">${this.data.blob}</div>
                <div class="hero-statistic" id="hero-statistics"></div>
              
            </div>
        `;

        Blob.updateStatistics();
    }

    blobClick() {
        document.querySelector('#blob_character img').addEventListener('click', () => {
            this.clicker.increment();
        });
    }


    static updateStatistics() {
        
        let lm = new LevelManagement();

        document.getElementById('hero-statistics') .innerHTML = `
        <ul>
            <li class="levelTtp">🆙 ${lm.level}</li>
            <li class="clickRate">💥 ${NumberFormatter.format(lm.calculateClickRate())}</li>
            <li class="AutoClick">💫 ${NumberFormatter.format(lm.calculateAutoClick())}</li>
        </ul>`;

        new Tooltip('levelTtp', 'The Hero Level');
        new Tooltip('clickRate', 'Damage or Harvest value');
        new Tooltip('AutoClick', 'Auto Click value');
    }
}