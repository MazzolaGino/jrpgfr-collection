import Map from "./Map.js";
import Base from "./tool/Base.js";

export default class Sidebar extends Base {

    constructor(id, data) {
        super(id, data);

        this.display();
    }

    display() {


        document.getElementById(this.id).innerHTML = /* html */`
            <div class="blob-menu"> 
                <div class="blob-menu-header"> Menu </div>
                <div class="blob-menu-item" id="blob_stat">${this.data.stats}</div> 
                <div class="blob-menu-item" id="blob_map">${this.data.map}</div> 
            </div>
        `;

        this.statClick();
        this.mapClick();
        
    }

    statClick() {
        document.querySelector('#blob_stat').addEventListener('click', () => {
            console.log('stats_click'); 
        });
    }

    mapClick() {
        document.querySelector('#blob_map').addEventListener('click', () => {
            new Map();
        });
    }

     
}