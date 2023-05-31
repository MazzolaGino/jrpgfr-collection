import Adv from "../Adv.js"; 
import EventStart from "../EventStart.js";

export default class Encounters {


    static generateStart() {
        let evt = new EventStart();
    }


    static generateAdv(eventStart) {
        return new Adv(eventStart, 'adv-clicker', {
            hp: 10,
            adv: '<img src="assets/img/monsters/pipo-enemy002.png">'
        });
    }
}