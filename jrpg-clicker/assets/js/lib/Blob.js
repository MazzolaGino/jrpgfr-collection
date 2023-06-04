import Base from "./tool/Base.js";
import ClickCounter from "./counter/ClickCounter.js";
import GameObserver from "./game/GameObserver.js";
import Config from "./resource/Config.js"
import _ from "./game/GameSave.js";
import Map from "./Map.js";

export default class Blob extends Base {
    
    constructor(id, data) {

        super(id, data);
        this.display();

        this.clicker = new ClickCounter('#blob_character img', Config.getBlobCountId());
        this.clicker.subscribe(new GameObserver());
        this.clicker.updateClicks();
        this.blobClick();
        this.openMap();
    }


    display() {

        document.getElementById(this.id).innerHTML = /* html */ `
            
            <div class="blob-menu-header">
                <img class="icon" src="assets/img/icons/S_Water07.png"> <span id="${Config.getBlobCountId()}"></span>
                 <span id="${Config.getLevelId()}"></span>
            </div>

            <div class="blob-body">
                <div class="content-options">
                    <button class="open-map">🗺️ Map</div>
                </div>
                <div class="blob content-hero" id="blob_character">${this.data.blob}</div>
            </div>
        `;
    }

    blobClick() {
        document.querySelector('#blob_character img').addEventListener('click', () => {
            this.clicker.increment();
        });
    }

    openMap() {
        document.querySelector('.open-map').addEventListener('click', () => { new Map()});
    }


}