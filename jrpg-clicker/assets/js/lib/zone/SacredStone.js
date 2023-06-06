import BaseMap from "../BaseMap.js";
import Config from "../resource/Config.js";
import Map from "../Map.js";
import Encounters from "../resource/Encounters.js";
import LevelManagement from "../tool/LevelManager.js";


export default class SacredStone extends BaseMap {
    constructor() {
        super();

        this.level = 3;
        this.exit = 'Exit Dungeon';
        this.eventStart = null;
        this.lm = new LevelManagement();
        this.lm.setCurrentDungeonLevel(this.level);
    }
    display() {

        
        document.getElementById(Config.getMapContainerId()).innerHTML = /* html */ `
            <div class="blob-menu-header fade-in-animation"> Map - ${Config.getSacredStone().name} <span id="map-location"></span></div>
            <div class="grid-map-sacred-stone fade-in-animation" id="grid-map"></div>
        `;


        this.eventStart = Encounters.generateStart(1); /* dungeon lvl */

        this.createGrid(30, 40, [
            { x: 5, y: 18, value: this.exit, action: (event) => {
                this.lm.resetCurrentDungeonLevel();
                this.eventStart.stop();
                new Map();
               
            }},
            { x: 5, y: 19, value: this.exit, action: (event) => {
                this.lm.resetCurrentDungeonLevel();
                this.eventStart.stop();
                new Map();
            }},
        ]);

        


        


    }
}