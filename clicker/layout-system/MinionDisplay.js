import Minion from "../game-system/Minion.js";

export default class MinionDisplay {

    static display(minion) {

        if (!(minion instanceof Minion)) {
            return '';
        }

        var div = document.createElement('div');
        div.id = minion.id;
        div.innerHTML = /* html */`
            <img src="${minion.image}"/>
            <span class="minion-name">${minion.name}</span>
            <span class="minion-level">${minion.level}</span>
        `; 
        document.getElementById('minions').append(div);

    }

}