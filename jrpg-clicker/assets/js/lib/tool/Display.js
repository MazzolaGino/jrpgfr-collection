import NumberFormatter from "./NumberFormatter.js";

export default class Display {

    static clickCount(id, value) {
        const elt = document.getElementById(id);
        elt.textContent = NumberFormatter.format(value);
    }

    static blobLevel(id, value) {
        const elt = document.getElementById(id);
        elt.innerHTML = '<img class="icon" src="assets/img/icons/E_Metal05.png"> ' + value;
    }

    static erase(id) {
        document.getElementById(id).innerHTML = '';
    }

}