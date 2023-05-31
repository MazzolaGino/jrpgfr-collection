import Base from "./tool/Base.js";

export default class Sidebar extends Base {

    constructor(id, data) {
        super(id, data);

        this.display();
    }

    

    display() {


        document.getElementById(this.id).innerHTML = /* html */`
            <div class="uk-card-header">
                <span>${this.data.name}</span>
            </div>
            <div class="uk-card-body">
                <ul class="uk-nav">
                    <li id="blob_stat">${this.data.stats}</li> 
                    <li id="blob_flowers">${this.data.flowers}</li>
                    <li id="blob_map">${this.data.map}</li>
                    <li id="blob_bonus">${this.data.bonus}</li>
                </ul>
            </div>
        `;

        this.statClick();
        this.flowersClick();
        this.mapClick();
        this.bonusClick();
        
    }

    statClick() {
        document.querySelector('#blob_stat').addEventListener('click', () => {
            console.log('stats_click'); 
        });
    }

    flowersClick() {
        document.getElementById('blob_flowers').addEventListener('click', () => {
            console.log('flowers_click'); 
        });
    }

    mapClick() {
        document.getElementById('blob_map').addEventListener('click', () => {
            console.log('map_click'); 
        });
    }

    bonusClick() {
        document.getElementById('blob_bonus').addEventListener('click', () => {
            console.log('bonus_click'); 
        });
    }

     
}