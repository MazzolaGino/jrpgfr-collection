import Clicker from "../Clicker.js";
import Field from "../Field.js";
import FieldComponent from "../FieldComponent.js";
import GameTemplate from "../templates/GameTemplate.js";
import SidebarComponent from "../components/SidebarComponent.js";
import ClickCounter from "../lib/ClickCounter.js";
import save from "../../../save.js";


export default class GameComponent extends FieldComponent{

    constructor() {

   

        const sidebar = new SidebarComponent();
        sidebar.load();

        let template = new GameTemplate();
        super(template.container, template);
    
        this.template = template;
        this.sidebar = sidebar;

        this.blob = new Field(this.template.blob, '', 'a', 'a');
        this.blob.load(this.template.blob);

        this.blob.setValue('<img src="assets/img/blob.webp">');

        this.blobAllies = new Field(this.template.blobAllies, '', 'a', 'a');
        this.blobAllies.load(this.template.blobAllies);

        this.blobAllies.setValue('<img class="one" src="assets/img/blob.webp"><img class="two" src="assets/img/blob.webp">');

        this.clicker = new Clicker();
        this.clickerCount = new ClickCounter(this.sidebar.flowersCount, save);

        this.clicker.setClickerCount(this.clickerCount);

        var blobImage = document.querySelector('.blob img');
        var container = document.createElement('div');
        container.classList.add('click-container');
        blobImage.parentNode.insertBefore(container, blobImage);


       

        
        this.blob.action(() => {

            this.clickerCount.increment();
            
        });


    }




}