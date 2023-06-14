import ClickerInstance from "../game-system/Clicker.js";
export default class HarvesterDisplay {

    constructor() {
       
        this.clickerInstance = ClickerInstance;
        this.initGold(); 
        this.harvester = document.querySelector('#harvester img.clicker'); 
        this.harvester.addEventListener('click', (event) => this.clickerInstance.click(event));
        document.addEventListener('harvest', (e) => {
            this.refreshGold(e.detail.g, e.detail.s, e.detail.r, e.detail.v);
            this.animateCount(e.detail.g);
        });
    }

    initGold() {
        this.refreshGold(
            this.clickerInstance.golds,
            this.clickerInstance.saphyres,
            this.clickerInstance.rubis,
            this.clickerInstance.vortex
        );
    }

    refreshGold(g, s, r, v) {
        document.getElementById('golds').innerHTML = `
            <div class="resource"><img class="currency" src="assets/img/cosmo/gold.png"><span id="gold-count">${g}</span></div>
            <div class="resource"><img class="currency" src="assets/img/cosmo/sapphyre.png" id="sapphyre-count">${s}</span></div>
            <div class="resource"><img class="currency" src="assets/img/cosmo/ruby.png" id="ruby-count">${r}</span></div>
            <div class="resource"><img class="currency" src="assets/img/cosmo/vortex.png" id="vortex-count">${v}</span></div>
        `;
    }

    animateCount(c) {

        const count = document.querySelector("#gold-count");
      
        const elementTop = count.offsetTop;
        const elementLeft = count.offsetLeft;
        const positionTop = elementTop;
      
        const displayElement = document.createElement("div");

        displayElement.textContent = '+ 1';
        displayElement.style.position = "absolute";
        displayElement.style.fontSize = "15px";
        displayElement.style.top = (positionTop - 19)  + "px";
        displayElement.style.left = (elementLeft + 50) + "px";
        displayElement.style.color = '#49be25';

        document.body.appendChild(displayElement);
      
        let distance = positionTop;
      
        const animationInterval = setInterval(() => {

          distance -= 5;
          displayElement.style.top = distance + "px";

          if (distance < positionTop - 40) {
            clearInterval(animationInterval);
            document.body.removeChild(displayElement);
          }

        }, 40);
      }

    

}