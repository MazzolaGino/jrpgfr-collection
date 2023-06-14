
import MinionFactory from "../factory-system/MinionFactory.js";

export default class Shop {
    
    static getList() {

        let list = [];
        
        for(var i = 0; i < 10; i++) {
            
            let item = {
                price: {
                    gold: this.getRandomPrice(),
                    ruby: this.getRandomPrice(),
                    saphyre: this.getRandomPrice(),
                    vortex: this.getRandomPrice()
                },
                minion: MinionFactory.generateMinion(3)
            } 
            
            list.push(item);
        }

        return list;
    }

    static getRandomPrice() {
        var min = 1;
        var max = 50;
        var chiffreAleatoire = Math.floor(Math.random() * (max - min + 1)) + min;
        return chiffreAleatoire;
    }
}