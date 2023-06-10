import BaseMap from "../BaseMap.js";
import Config from "../resource/Config.js";
import Map from "../Map.js";
import Encounters from "../resource/Encounters.js";
import LevelManagement from "../tool/LevelManager.js";
import AdvBackground from "../tool/AdvBackground.js";
import DungeonManager from "../dungeon_system/DungeonManager.js";
import Chest from "../tool/Chest.js";


export default class SacredStone extends BaseMap {
    constructor() {
        super();

        this.exit = 'Exit Dungeon';
        this.eventStart = null;
        this.loot = 'Chest';
        DungeonManager.getInstance().setCurrent('SacredStone');
        AdvBackground.set(Config.getSacredStone().id);

        this.chest = new Chest('sacred-stone');
        
    }
    display() {

        
        
        document.getElementById(Config.getMapContainerId()).innerHTML = /* html */ `
            <div class="blob-menu-header fade-in-animation"> Map - ${Config.getSacredStone().name} <span id="map-location"></span></div>
            <div class="grid-map-sacred-stone fade-in-animation" id="grid-map"></div>
        `;
        
        this.eventStart = Encounters.generateStart(this.level); /* dungeon lvl */

        this.createGrid(30, 40, [
            { x: 5, y: 18, value: this.exit, action: (event) => {
                this.eventStart.stop();
                new Map();
               
            }},
            { x: 5, y: 19, value: this.exit, action: (event) => {
                this.eventStart.stop();
                new Map();
            }},

            { x: 15, y: 19, value: this.loot, action: (event) => {
                this.chest.drop();
            }},
        ]);
    }
}