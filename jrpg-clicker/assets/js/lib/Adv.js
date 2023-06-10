import Base from "./tool/Base.js";
import AdvCounter from "./counter/AdvCounter.js";
import GameObserver from "./game/GameObserver.js";
import AdvBackground from "./tool/AdvBackground.js";

export default class Adv extends Base {

    constructor(id, data, boss = false) {
        super(id, data);

        this.title = '';
        if(boss === true) {
            this.title = 'Boss';
        }
        
        this.display();
        this.clicker = new AdvCounter(boss, data.hp, '#adv_character img', 'adv_count');
        this.clicker.subscribe(new GameObserver()).displayHp();

    
    }

    display() {
        document.getElementById(this.id).innerHTML = `
            <div class="blob-menu-header">
                ${this.title} <img class="icon" src="assets/img/icons/S_Holy01.png"><span id="adv_count"></span>
            </div>
            <div class="adv-container ${AdvBackground.get()}">
                <div class="adv ${this.title}" id="adv_character">${this.data.adv}</div>
            </div>
        `;
    }
}