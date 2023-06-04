import Config from "./resource/Config.js";
import Encounters from "./resource/Encounters.js";

export default class EventStart {

    constructor() {
        this.eventName = '';
        this.eventBody = '';
        this.interval = this.generateEvent();
        this.eventBusy = false;
    }

    generateEvent() {
        
        return setInterval(() => {
            if(this.eventBusy === false) {
                this.eventBusy = true;
                this.eventName = 'Battle';
                this.eventBody = /* html */ `
                    <p><button id="${Config.getEventStartId()}" class="uk-button uk-button-default"> Start Battle!</button></p>`;
                this.display();
            }
        }, 1000);

    }

    display() {

        document.getElementById(Config.getAdvId()).innerHTML = /* html */ `
            <div class="blob-menu-header fight-start-animation">
                New ${this.eventName}! 
            </div>
            <div class="adv-container">
                ${this.eventBody}
            </div>
        `;

        document.getElementById(Config.getEventStartId()).addEventListener('click', (event) => {
            Encounters.generateAdv(this);
        });
    }

    stop() {
        document.getElementById(Config.getAdvId()).innerHTML = '';
        clearInterval(this.interval);
    }

}