import _ from "../game/GameSave.js";
import Display from "../tool/Display.js";
import NumberFormatter from "../tool/NumberFormatter.js";
import LevelManagement from "./../tool/LevelManager.js"
export default class AutoCounter{
    constructor() {
        
        setInterval(() => {
            let lm = new LevelManagement();
            _.setClicks(parseFloat(_.getClicks()) + lm.calculateAutoClick());
            if( lm.calculateAutoClick() > 0 ) {
                this.animateBlobCount(lm.calculateAutoClick());
            }
            Display.clickCount('blob_count', _.getClicks());
           
        }, 1000);
    }

    animateBlobCount(bonus) {

        const blobCount = document.getElementById("blob_count");
      
        const elementTop = blobCount.offsetTop;
        const elementLeft = blobCount.offsetLeft;
        const positionTop = elementTop - 10;
      
        const displayElement = document.createElement("div");
        displayElement.textContent = '+ ' + NumberFormatter.format(bonus);
        displayElement.style.position = "absolute";
        displayElement.style.top = positionTop + "px";
        displayElement.style.left = (elementLeft + 75) + "px";
        displayElement.style.color = 'gold';
        document.body.appendChild(displayElement);
      
        let distance = positionTop;
      
        const animationInterval = setInterval(() => {

          distance -= 3;
          displayElement.style.top = distance + "px";

          if (distance < positionTop - 30) {
            clearInterval(animationInterval);
            document.body.removeChild(displayElement);
          }

        }, 20);
      }
}