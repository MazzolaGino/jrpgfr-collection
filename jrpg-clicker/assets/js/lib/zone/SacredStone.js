import BaseMap from "../BaseMap.js";
import Config from "../resource/Config.js";
import Map from "../Map.js";
import Encounters from "../resource/Encounters.js";


export default class SacredStone extends BaseMap {
    constructor() {
        super();
        this.loadCloseMap();
        this.exit = 'Exit Dungeon';
        this.eventStart = null;


    }
    display() {
        
        document.getElementById(Config.getMapContainerId()).innerHTML = /* html */ `
            <div class="blob-menu-header fade-in-animation"> Map - ${Config.getSacredStone().name} <span id="map-location"></span><span id="close-map"> X </div>
            <div class="grid-map-liberty-town fade-in-animation" id="grid-map"></div>
        `;
        this.eventStart = Encounters.generateStart();

        this.createGrid(30, 40, [
            { x: 7, y: 15, value: this.exit, action: (event) => {
                new Map();
                console.log(this.eventStart.interval);
                this.eventStart.stop();
            }}
        ]);

        

        this.loadCloseMap();

    }
}