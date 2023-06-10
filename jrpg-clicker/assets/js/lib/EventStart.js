import DungeonManager from "./dungeon_system/DungeonManager.js";
import Config from "./resource/Config.js";
import Encounters from "./resource/Encounters.js";
import AdvBackground from './tool/AdvBackground.js';
import Notification from "./tool/Notification.js";

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
                        <div class="adv_start"><button id="${Config.getEventStartId()}" class="uk-button uk-button-default"> Start Battle!</button></div>`;
                    this.display();
            }
        }, 1000);

    }

    display() {

        DungeonManager.getInstance().decrement();

        if(DungeonManager.getInstance().end()) {
             document.getElementById(Config.getAdvId()).innerHTML = /* html */ `
                <div class="blob-menu-header fight-start-animation">
                    Battle End Result!  
                </div>
                <div class="adv-container event-end-result ${AdvBackground.get()}">
                    <div class="adv-hero"><img src="assets/img/isa-deu-jumpinganim700.gif" /></div>
                    <div class="battle-result">
                        <p class="fight-start-animation">Congratulations, you complete the dungeon !</p>
                        <p><button class="uk-button uk-button-default" id="${Config.getUseADungeonKey()}">Use a key to continue ?</button></p>
                    </div>
                </div>
            `;

            document.getElementById(Config.getUseADungeonKey()).addEventListener('click', () => {
                if(DungeonManager.getInstance().useKey() === true) {
                    Encounters.generateAdv();
                } else{
                    let notif = new Notification('red', 'You don\'t have a key...');
                    notif.show();
                }
            });
        } else {
            document.getElementById(Config.getAdvId()).innerHTML = /* html */ `
            <div class="blob-menu-header fight-start-animation">
                New ${this.eventName}! 
            </div>
            <div class="adv-container  ${AdvBackground.get()}">            
                ${this.eventBody}
            </div>
        `;

        document.getElementById(Config.getEventStartId()).addEventListener('click', (event) => {
            Encounters.generateAdv();
        });
        }

        
    }

    stop() {
        document.getElementById(Config.getAdvId()).innerHTML = '';
        clearInterval(this.interval);
    }

}