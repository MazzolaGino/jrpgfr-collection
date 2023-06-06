import Base from "./tool/Base.js";
import AdvCounter from "./counter/AdvCounter.js";
import GameObserver from "./game/GameObserver.js";

export default class Adv extends Base {

    constructor(id, data) {
        super(id, data);
        this.display();
        this.clicker = new AdvCounter(data.hp, '#adv_character img', 'adv_count');
        this.clicker.subscribe(new GameObserver()).displayHp();
        document.getElementById('auto-battle').addEventListener('click', () => { this.clicker.autoBattle() });
    }

    display() {
        document.getElementById(this.id).innerHTML = `
            <div class="blob-menu-header">
                <img class="icon" src="assets/img/icons/S_Holy01.png"><span id="adv_count"></span><a href="javascript:void(0)" id="auto-battle"> ▶️</a>
            </div>
            <div class="adv-container">
                <div class="adv" id="adv_character">${this.data.adv}</div>
            </div>
        `;
    }
}