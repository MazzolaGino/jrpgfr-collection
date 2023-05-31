import _ from "../game/GameSave.js";
import Config from "../resource/Config.js";
import Display from "../tool/Display.js";

export default class AutoCounter{
    constructor() {

        setInterval(() => {
            _.getSave().shop.forEach( b => {
                if(parseInt(b.nb) > 0) {
                    _.setClicks(parseFloat(_.getClicks()) + (parseFloat(_.getSave().click_rate) *  parseFloat(b.nb) * parseFloat(b.bonus)));
                    Display.clickCount(Config.getBlobCountId(), _.getClicks());
                }
            });
        }, 1000);
    }
}