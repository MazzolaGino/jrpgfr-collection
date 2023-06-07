import BaseMap from "../BaseMap.js";
import Config from "../resource/Config.js";
import Map from "../Map.js";
import Encounters from "../resource/Encounters.js";
import LevelManagement from "../tool/LevelManager.js";
import AdvBackground from "../tool/AdvBackground.js";


export default class SacredForest extends BaseMap {

    constructor() {

        super();
        this.level = 5;
        this.exit = 'Exit Dungeon';
        this.eventStart = null;
        this.lm = new LevelManagement();
        this.lm.setCurrentDungeonLevel(this.level);

        AdvBackground.set(Config.getSacredForest().id);
        
    }

    display() {
        
        document.getElementById(Config.getMapContainerId()).innerHTML = /* html */ `
            <div class="blob-menu-header fade-in-animation"> Map - ${Config.getSacredForest().name} <span id="map-location"></span></div>
            <div class="grid-map-sacred-forest fade-in-animation" id="grid-map"></div>
        `;

        this.eventStart = Encounters.generateStart(this.level); /* dungeon lvl */

        this.createGrid(30, 40, [
            { x: 2, y: 9, value: this.exit, action: (event) => {
                this.lm.resetCurrentDungeonLevel();
                this.eventStart.stop();
                new Map();
               
            }},
            { x: 2, y: 10, value: this.exit, action: (event) => {
                this.lm.resetCurrentDungeonLevel();
                this.eventStart.stop(); 
                new Map();
            }},
        ]);
    }
}