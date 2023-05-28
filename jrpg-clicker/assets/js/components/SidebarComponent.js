import Field from "./../Field.js";
import SidebarTemplate from "./../templates/SidebarTemplate.js";
import FieldComponent from "./../FieldComponent.js";

export default class CollectionForm extends FieldComponent {

    constructor() {

        let template = new SidebarTemplate();

        super(template.container, template);

        this.flowersCount = this.template.flowersCount;


        this.level = new Field(this.template.level, 'Lv.', 'span', 'span');
        this.stats = new Field(this.template.stats, 'Statistiques', 'span', 'span');
        this.flowers = new Field(this.template.flowers, 'Fleurs', 'span', 'span');
        this.map = new Field(this.template.map, 'Map', 'span', 'span');
        this.bonus = new Field(this.template.bonus, 'Bonus', 'span', 'span');
    
    }

    action() {
        this.stats.action((value) => {
            console.log(value);
        });
        
        this.flowers.action((value) => {
            console.log(value);
        });
        
        this.map.action((value) => {
            console.log(value);
        });

        this.bonus.action((value) => {
            console.log(value);
        });
    }

    load() {

        this.level.load(this.template.level);
        this.stats.load(this.template.stats);
        this.flowers.load(this.template.flowers);
        this.map.load(this.template.map);
        this.bonus.load(this.template.bonus);

        this.action();

        console.log('sidebar component loaded');
    }

}