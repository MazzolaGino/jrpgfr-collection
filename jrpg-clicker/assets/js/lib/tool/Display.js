import NumberFormatter from "./NumberFormatter.js";

export default class Display {

    static clickCount(id, value) {
        const elt = document.getElementById(id);
        elt.textContent = NumberFormatter.format(value);
    }

    static  BattleEnd() {
        
    }

    static erase(id) {
        document.getElementById(id).innerHTML = '';
    }

}