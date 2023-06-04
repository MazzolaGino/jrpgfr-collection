import Sidebar from "../lib/Sidebar.js";
import Blob from "../lib/Blob.js";
import GameSave from "../lib/game/GameSave.js";
import Shop from "../lib/Shop.js";
import AutoCounter from "../lib/counter/AutoCounter.js";
import Encounters from "../lib/resource/Encounters.js";
import Display from "../lib/tool/Display.js";
import Config from "../lib/resource/Config.js";
import Map from "../lib/Map.js";

export default class GameComponent {

    constructor() {

        GameSave.init();
        new AutoCounter();
        new Map();
        const blob = new Blob('blob-clicker', {
            blob: '<img src="assets/img/hero.gif">'
        });

        Display.blobLevel(Config.getLevelId(), GameSave.getSave().level); 
        
    }
}