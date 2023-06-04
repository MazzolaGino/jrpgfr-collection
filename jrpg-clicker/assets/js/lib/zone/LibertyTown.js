import BaseMap from "../BaseMap.js";
import Config from "../resource/Config.js";
import Shop from "../Shop.js";
import Modal from "../tool/Modal.js";
import Map from "../Map.js";

export default class LibertyTown extends BaseMap {
    constructor() {
        super();
        this.loadCloseMap();
        this.itemShop = 'Item Shop';
        this.weaponShop = 'Weapon Shop';
        this.goddessStatue = 'Goddess Status';
        this.well = 'Town Well';
        this.pnj = 'Baldurc';
        this.exit = 'Exit';
        this.modal = new Modal('modal', 'Item Shop', `<div id="modal-shop"></div>`);
    }
    display() {
        
        document.getElementById(Config.getMapContainerId()).innerHTML = /* html */ `
            <div class="blob-menu-header fade-in-animation"> Map - ${Config.getLibertyTown().name} <span id="map-location"> </span><span id="close-map"> X </div>
            <div class="grid-map-liberty-town fade-in-animation" id="grid-map"></div>
        `;

        this.createGrid(30, 40, [
            { x: 20, y: 0, value: this.exit, action: () => { new Map()}},
            { x: 21, y: 0, value: this.exit, action: () => { new Map()}},
            { x: 7, y: 15, value: this.itemShop, action: (event) => {
                this.modal.open();
                Shop.load('modal-shop', true);    
            }},
            { x: 17, y: 17, value: this.pnj},
            { x: 7, y: 24, value: this.goddessStatue},
            { x: 17, y: 22, value: this.well},
            { x: 29, y: 15, value: this.weaponShop},
            { x: 28, y: 15, value: this.weaponShop},
            { x: 29, y: 22, value: this.goddessStatue},
        ]);

        this.loadCloseMap();

    }
}