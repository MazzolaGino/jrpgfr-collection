import Sidebar from "../lib/Sidebar.js";
import Adv from "../lib/Adv.js";
import Blob from "../lib/Blob.js";
import GameSave from "../lib/game/GameSave.js";
import Inventory from "../lib/Inventory.js";
import Shop from "../lib/Shop.js";
import AutoCounter from "../lib/counter/AutoCounter.js";
import Encounters from "../lib/resource/Encounters.js";


export default class GameComponent {

    constructor() {

        GameSave.init();
        Inventory.load();
        Shop.load();

        let AutoClick = new AutoCounter();
        
        const sidebar = new Sidebar('blob-sidebar', {
            name: 'Blob',
            stats: 'Stats',
            flowers: 'Flowers',
            map: 'Map',
            bonus: 'Bonus'
        });

        const blob = new Blob('blob-clicker', {
            blob: '<img src="assets/img/blob.webp">'
        });

        Encounters.generateStart();
       
    }
}