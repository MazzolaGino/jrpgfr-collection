import Config from "./resource/Config.js";
import Encounters from "./resource/Encounters.js";

export default class EventStart {

    constructor() {
        this.eventName = '';
        this.eventBody = '';
        this.generateEvent();
        this.eventBusy = false;

        setTimeout(() => {

        }, 3000);
    }

    generateEvent() {
        
        setInterval(() => {
            if(this.eventBusy === false) {
                this.eventBusy = true;
                this.eventName = 'Battle';
                this.eventBody = /* html */ `
                    <h1>Start</h1>
                    <br /><br />
                    <p><button id="${Config.getEventStartId()}" class="uk-button uk-button-default">Go!</button></p>`;
                this.display();
            }
        }, 1000);
    }

    display() {

        document.getElementById(Config.getAdvId()).innerHTML = /* html */ `
            <div class="uk-card-header fight-start-animation">
                New ${this.eventName}! 
            </div>
            <div class="uk-card-body fight-start-animation">
                ${this.eventBody}
            </div>
        `;

        document.getElementById(Config.getEventStartId()).addEventListener('click', (event) => {
            Encounters.generateAdv(this);
        });
    }



}