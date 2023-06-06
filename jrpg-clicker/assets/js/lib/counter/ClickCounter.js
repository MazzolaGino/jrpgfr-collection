import NumberFormatter from "../tool/NumberFormatter.js";
import _ from "../game/GameSave.js";
import Observable from "../tool/Observable.js";
import Display from "../tool/Display.js";
import LevelManagement from "../tool/LevelManager.js";

export default class ClickCounter extends Observable {

  constructor(selector, updateCountElement, cls = 'glow-effect', mincls = 'plus-one') {
    super();

    this.addBonuses();
    this.animatedElement = document.querySelector(selector);
    this.cls = cls;
    this.mincls = mincls;
    this.updateCountElement = updateCountElement;
    this.animatedElement.addEventListener("click", this.glow.bind(this));

  }

  addBonuses() {
    _.getBonus().forEach((item) => {
      setInterval(() => {
        _.setClicks(parseFloat(_.getClicks()) + parseFloat(item));
        this.updateClicks();
      }, 1000);
    })
  }

  increment() {
    let lm = new LevelManagement();

    console.log(lm.calculateClickRate());
    _.setClicks(parseFloat(_.getClicks()) + parseFloat(lm.calculateClickRate()));
    Display.clickCount(this.updateCountElement, _.getClicks());
    this.animateBlobCount(lm.calculateClickRate());
  }

  updateClicks() {
    Display.clickCount(this.updateCountElement, _.getClicks());
  }

  formatNumber(number) {
    return NumberFormatter.format(number);
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
    displayElement.style.left = (elementLeft + 100)+ "px";
    displayElement.style.color = 'green';
    document.body.appendChild(displayElement);
  
    let distance = positionTop;
  
    const animationInterval = setInterval(() => {

      distance -= 3;
      displayElement.style.top = distance + "px";

      if (distance < positionTop - 40) {
        clearInterval(animationInterval);
        document.body.removeChild(displayElement);
      }

    }, 20);
  }



  glow(event) {

    event.target.classList.add(this.cls);

    setTimeout(() => {
      event.target.classList.remove(this.cls);
    }, 500);

  }
}