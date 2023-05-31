import GameSave from "./game/GameSave.js";

export default class Inventory {
    static add(item) {
        let el = document.getElementById('blob-inventory');
        // TODO: verifier si l'objet n'existe pas déjà dans l'inventaire pour faire +1

        let vItem = document.createElement('li');
        let vItemImg = document.createElement('img'); 
        let vItemName = document.createElement('span'); 
        vItemImg.src = 'assets/img/icons/' + item.name;

        const lastIndex =  item.name.lastIndexOf("_");
        let result =  item.name.substring(lastIndex + 1);        
        const dotIndex = result.lastIndexOf(".");

        if (dotIndex !== -1) {
            result = result.substring(0, dotIndex);
        }

        vItem.append(vItemImg);
        vItemName.textContent = ' ' + result;
        vItem.append(vItemName);
        el.append(vItem);

        return vItemImg.outerHTML + ' ' + vItemName.outerHTML;
    }

    static load() {
        GameSave.getSave().inventory.forEach(item => {
            this.add(item);
        });
    }
}