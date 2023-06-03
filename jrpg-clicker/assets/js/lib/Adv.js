import Base from "./tool/Base.js";
import AdvCounter from "./counter/AdvCounter.js";
import GameObserver from "./game/GameObserver.js";

export default class Adv extends Base {
    constructor(eventStart, id, data) {
        
        super(id, data);
        this.display();

        this.clicker = new AdvCounter(eventStart, data.hp, '#adv_character img', 'adv_count');
        this.clicker.subscribe(new GameObserver()).displayHp();
    }

    display() {
        document.getElementById(this.id).innerHTML = /* html */ `
            <div class="blob-menu-header">
                <img class="icon" src="assets/img/icons/S_Holy01.png"> <span id="adv_count"></span>
            </div>
            <div class="adv-container">
                <p class="adv" id="adv_character">${this.data.adv}</p>
            </div>
        `;
    }

    static erase() {
        document.getElementById('adv-clicker').innerHTML = '';
    }
}