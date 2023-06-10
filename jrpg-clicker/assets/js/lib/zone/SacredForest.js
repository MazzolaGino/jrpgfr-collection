import BaseMap from "../BaseMap.js";
import Config from "../resource/Config.js";
import Map from "../Map.js";
import Encounters from "../resource/Encounters.js";
import AdvBackground from "../tool/AdvBackground.js";
import DungeonManager from "../dungeon_system/DungeonManager.js";
import Chest from "../tool/Chest.js";


export default class SacredForest extends BaseMap {

    constructor() {

        super();

        this.exit = 'Exit Dungeon';
        this.eventStart = null;
        this.loot = 'Chest';

        DungeonManager.getInstance().setCurrent('SacredForest');
        AdvBackground.set(Config.getSacredForest().id);
        this.chest1 = new Chest('sacred-forest-1');
        this.chest2 = new Chest('sacred-forest-2');
    }

    display() {
        
        document.getElementById(Config.getMapContainerId()).innerHTML = /* html */ `
            <div class="blob-menu-header fade-in-animation"> Map - ${Config.getSacredForest().name} <span id="map-location"></span></div>
            <div class="grid-map-sacred-forest fade-in-animation" id="grid-map"></div>
        `;

        this.eventStart = Encounters.generateStart(); /* dungeon lvl */

        this.createGrid(30, 40, [
            { x: 2, y: 9, value: this.exit, action: (event) => {
                this.eventStart.stop();
                new Map();
               
            }},

            { x: 2, y: 10, value: this.exit, action: (event) => {
                this.eventStart.stop(); 
                new Map();
            }},


            { x: 7, y: 10, value: this.loot, action: (event) => {
                this.chest1.drop();
            }},

            { x: 36, y: 10, value: this.loot, action: (event) => {
                this.chest2.drop(); 
            }},
        ]);
    }
}