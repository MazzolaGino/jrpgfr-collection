import MinionFactory from "../factory-system/MinionFactory.js";
import Minion from "../game-system/Minion.js";
import Save from "../tools/Save.js";

export default class MinionRepository {

    static getList() {

        let minions = [];
        let list = JSON.parse(Save.get('minions')); 

        if(list) {
            list.forEach((element) => {
                minions.push(MinionRepository.getById(element));
            });
        }

        return minions;
    }

    static getById(id) {
        const m = JSON.parse(Save.get(id));
        return Minion.import(m);
    }

    static save(m) {
        Save.set(m.id, JSON.stringify(m.export()));
    }

    static create(){
        const minion = MinionFactory.generateMinion();
        let minions = JSON.parse(Save.get('minions') || '[]');

        minions.push(minion.id);

        Save.set('minions', JSON.stringify(minions));

        return minion;
    }
}