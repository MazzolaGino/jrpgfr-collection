import Inventory from "../Inventory.js";
import _ from "../game/GameSave.js";
import Drops from "../resource/Drops.js";
import Modal from "./Modal.js";
import Timer from "./Timer.js";

export default class Chest {
    constructor(name) {
        this.name = name;
        this.timerId = `chest-timer-${this.name}`;
        this.timer = new Timer(300000, this.timerId);
    }

    drop() {

        let chestModal = null;

        if (!this.timer.inProgress()) {

            let item = (new Drops()).generateLoot();

            Inventory.add(item);
            _.incrementLoot();

            chestModal = new Modal('modal', '🎁 Chest',
                `<div id="modal-chest"> 
                <div class="chest-item">New item added to inventory : <img src="${item.url}" /> ${item.name}!</div>
                <div class="chest-timer">Next loot in <span id="${this.timerId}"></span>!</div>
            </div>
            `);

            this.timer.stop();
            this.timer = new Timer(300000, this.timerId);

        } else {
            chestModal = new Modal('modal', '🎁 Chest', `
            <div id="modal-chest"> 
                <div class="chest-item">The chest is empty...</div>
                <div class="chest-timer">Next loot in <span id="${this.timerId}"></span>!</div>
            </div>
            `);
        }

        chestModal.open();

        this.timer.start();
        this.timer.load();
    }


}