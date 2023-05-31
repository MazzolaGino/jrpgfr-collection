import Observer from "../tool/Observer.js";
import CookieManager from "../tool/CookieManager.js";
import Drops from "../resource/Drops.js";
import Display from "../tool/Display.js";
import GameSave from "./GameSave.js";
import Adv from "../Adv.js";
import Inventory from "../Inventory.js";

export default class GameObserver extends Observer {
    
    constructor() {
        super();
        this.cm = CookieManager;
    }

    update(event) {
        if(this[event.type]) {
            this[event.type](event);
        }
    }

    enemyDefeated(event) {
       
        // todo: montrer le compte rendu du combat
        


        // todo: augmenter l'expérience du personnage
        // todo: rajouter de l'xp et un système de niveau au personnage
        // todo: ajouter un bouton pour fermer et relancer le Encounters generate
    }

    displayClicks(event) {
        Display.clickCount(event.id, event.value); 
    }
}