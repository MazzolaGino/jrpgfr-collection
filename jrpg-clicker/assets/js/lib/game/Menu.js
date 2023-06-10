import LevelManagement from "../tool/LevelManager.js";
import Modal from "../tool/Modal.js";
import NumberFormatter from "../tool/NumberFormatter.js";
import _ from '../game/GameSave.js'
export default class Menu {

    constructor() {
        document.getElementById('Statistics').addEventListener('mouseup', this.statistics.bind(this));
        document.getElementById('Quests').addEventListener('mouseup', this.quests.bind(this));
        document.getElementById('Achievements').addEventListener('mouseup', this.achievements.bind(this));
        document.getElementById('Inventory').addEventListener('mouseup', this.inventory.bind(this));
        document.getElementById('Monsters').addEventListener('mouseup', this.monsters.bind(this));
        document.getElementById('Save').addEventListener('mouseup', this.save.bind(this));
        document.getElementById('Load').addEventListener('mouseup', this.load.bind(this));
        document.getElementById('Reset').addEventListener('mouseup', this.reset.bind(this));
        document.getElementById('Credits').addEventListener('mouseup', this.credits.bind(this));

        
        this.modal = null;
    }

    statistics() {
        
        this.modal = new Modal('modal', 'Statistics', `
            <div id="modal-statistics"></div>
        `);
        this.modal.open();
        this.displayStatistics('modal-statistics');
    }

    displayStatistics(id) {
        
        let lm = new LevelManagement();

       

        document.getElementById(id) .innerHTML = `
        <ul>
            <li>🆙 Level <span class="statistics-value">${lm.level}</span></li>
            <li>💥 Click <span class="statistics-value">${NumberFormatter.format(lm.calculateClickRate())}</span></li>
            <li>💫 Auto click <span class="statistics-value">${NumberFormatter.format(lm.calculateAutoClick())}</span></li>
            <li>📈 Exp <span class="statistics-value">${NumberFormatter.format(lm.experience)}/${NumberFormatter.format(lm.calculateExperienceToNextLevel())}</span></li>
            <li>🩻 Monsters killed <span class="statistics-value">${NumberFormatter.format(parseInt(_.getSave().adv_killed))}</span></li>
            <li>💰 Loot acquired <span class="statistics-value">${NumberFormatter.format(parseInt(_.getSave().loot_acquired))}</span></li>
            <li>⚔️ Quests done <span class="statistics-value">${NumberFormatter.format(parseInt(_.getSave().quests_done))}</span></li>
            <li>🏆 Achievements done <span class="statistics-value">${NumberFormatter.format(parseInt(_.getSave().achievements_done))}</span></li>
        </ul>`;
        
    }

    quests() {
        this.modal = new Modal('modal', 'Quests', `<div id="modal-quests"></div>`);
        this.modal.open();
    }

    achievements() {
        this.modal = new Modal('modal', 'Achievements', `<div id="modal-achievements"></div>`);
        this.modal.open();
    }

    inventory() {
    
        let inventory = _.getInventory();
        let displayInventory = '';

        for(var index in inventory) {
            let number = (inventory[index].nb > 1) ? 'x ' + inventory[index].nb : '';
            displayInventory += /* html */ `<div class="inventory-item"><img src="${inventory[index].url}">${number}</div>`;
        }

        this.modal = new Modal('modal', 'Inventory', `<div id="modal-inventory">${displayInventory}</div>`);
        this.modal.open();
    }

    monsters() {
        this.modal = new Modal('modal', 'Monsters', `<div id="modal-monsters"></div>`);
        this.modal.open();
    }

    save() {
        this.modal = new Modal('modal', 'Save', `<div id="modal-save"></div>`);
        this.modal.open();
    }

    load() {
        this.modal = new Modal('modal', 'Load', `<div id="modal-load"></div>`);
        this.modal.open();
    }

    reset() {
        this.modal = new Modal('modal', 'Reset', `<div id="modal-reset"></div>`);
        this.modal.open();
    }

    credits() {
        this.modal = new Modal('modal', 'Credits', `<div id="modal-credits"></div>`);
        this.modal.open();
    }
}