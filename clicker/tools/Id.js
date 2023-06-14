import Save from "./Save.js";

export default class Id {
    static get(name) {

        let next_id = 0;

        if(Save.get(name)) {
            next_id =  (parseInt(Save.get(name)) + 1);
        }else{
            next_id = 0;
        }

        Save.set(name, next_id);

        return name + next_id;
    }
}