import clickerInstance from "../game-system/Clicker.js";
import Minion from "../game-system/Minion.js";
import MinionDisplay from "./MinionDisplay.js";

export default class Layout {
    constructor() {
        
        document.getElementById('minions').addEventListener('drop', (event) => {
           
            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            
            let item = Minion.import(JSON.parse(data).minion);
            let price = JSON.parse(data).price;1

    

                MinionDisplay.display(item);

                let element = document.getElementById('item-' + item.id);
                element.parentNode.removeChild(element);
            
            

        });

        document.getElementById('minions').addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        this.blocks = [
            'missions',
            'minions',
            'recruitment'
        ];

        this.blocks.forEach(block => this.loadBlock(block));
    }

    loadBlock(name) {
        var checkbox = document.getElementById('display-' + name);
        checkbox.checked = true;
        var div = document.getElementById(name + '-section');

        checkbox.addEventListener('change', (event) => {

            if (checkbox.checked) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });
    }
}