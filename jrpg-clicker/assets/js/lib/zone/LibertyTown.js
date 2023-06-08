import BaseMap from "../BaseMap.js";
import Config from "../resource/Config.js";
import Shop from "../Shop.js";
import Modal from "../tool/Modal.js";
import Map from "../Map.js";
import WeaponShop from "../WeaponShop.js";
import Drops from "../resource/Drops.js";
import Inventory from "../Inventory.js";

export default class LibertyTown extends BaseMap {
    constructor() {
        super();
        this.itemShop = 'Item Shop';
        this.loot = 'Chest';
        this.weaponShop = 'Weapon Shop';
        this.goddessStatue = 'Goddess Status';
        this.well = 'Town Well';
        this.pnj = 'Baldurc';
        this.exit = 'Exit';
        this.modal = new Modal('modal', 'Item Shop', `<div id="modal-hero"><img src="assets/img/isa-deu-zoom-ugh.gif"></div><div id="modal-shop"></div>`);
        this.modalW = new Modal('modal', 'Weapon Shop', `<div id="modal-hero"><img src="assets/img/isa-deu-zoom-ugh.gif"></div><div id="modal-weapon-shop"></div>`);
        this.chest = (Math.floor(Math.random() * 2) + 1) === 1 ? false : true;
    }


    display() {

        document.getElementById(Config.getMapContainerId()).innerHTML = /* html */ `
            <div class="blob-menu-header fade-in-animation"> Map - ${Config.getLibertyTown().name} <span id="map-location"></div>
            <div class="grid-map-liberty-town fade-in-animation" id="grid-map"></div>
        `;

        this.createGrid(30, 40, [
            { x: 0, y: 19, value: this.exit, action: () => { new Map() } },
            { x: 0, y: 20, value: this.exit, action: () => { new Map() } },
            { x: 0, y: 21, value: this.exit, action: () => { new Map() } },
            { x: 0, y: 22, value: this.exit, action: () => { new Map() } },
            { x: 0, y: 23, value: this.exit, action: () => { new Map() } },
            { x: 0, y: 24, value: this.exit, action: () => { new Map() } },
            { x: 0, y: 25, value: this.exit, action: () => { new Map() } },
            {
                x: 20, y: 18, value: this.itemShop, action: (event) => {
                    this.itemShopShow();
                }
            },
            {
                x: 21, y: 18, value: this.itemShop, action: (event) => {
                    this.itemShopShow();
                }
            },

            {
                x: 10, y: 19, value: this.loot, action: (event) => {
                   this.dropChest();
                    
                }
            },
            {
                x: 11, y: 19, value: this.loot, action: (event) => {
                    this.dropChest();
                }
            },

            {
                x: 34, y: 18, value: this.weaponShop, action: () => {
                    this.weaponShopShow();
                }
            },
            {
                x: 35, y: 18, value: this.weaponShop, action: () => {
                    this.weaponShopShow();
                }
            }
        ]);
    }

    dropChest() {
        if(this.chest === false) {

            this.chest = true;
            let item = (new Drops()).generateLoot();
            Inventory.add(item);
            let chestModal = new Modal('modal', 'Chest', `<div id="modal-chest"> New item added to inventory : <img src="${item.url}" /> ${item.name} ! </div>`);
            chestModal.open();
        }else{
            let chestModal = new Modal('modal', 'Chest', `<div id="modal-chest"> The chest is empty !`);
            chestModal.open();
        }
    }

    weaponShopShow() {
        this.modalW.open();
        this.modalW.ivl(WeaponShop.load('modal-weapon-shop', true));
    }

    itemShopShow() {
        this.modal.open();
        let ivl = Shop.load('modal-shop', true);
        this.modal.ivl(ivl);
    }
}