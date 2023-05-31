import GameSave from "./game/GameSave.js";

export default class Inventory {

    static line(item) {

        const lastIndex = item.name.lastIndexOf("_");
        let result = item.name.substring(lastIndex + 1);
        const dotIndex = result.lastIndexOf(".");

        if (dotIndex !== -1) {
            result = result.substring(0, dotIndex);
        }

        let nb = '';
        if (parseInt(item.nb) !== 0) {
            nb = 'x' + item.nb;
        }

        return /* html */`
            <li>
                <img src="assets/img/icons/${item.name}">
                <span>${result} ${nb}</span>
            </li>
        `;

    }

    static simpleLine(item) {

        const lastIndex = item.name.lastIndexOf("_");
        let result = item.name.substring(lastIndex + 1);
        const dotIndex = result.lastIndexOf(".");

        if (dotIndex !== -1) {
            result = result.substring(0, dotIndex);
        }

        return /* html */`
            <li>
                <img src="assets/img/icons/${item.name}">
                <span>${result}</span>
            </li>
        `;

    }

    static load() {
        let text = '';
        GameSave.getSave().inventory.forEach(item => {
            text += this.line(item);
        });

        document.getElementById('blob-inventory').innerHTML = text;
    }
}