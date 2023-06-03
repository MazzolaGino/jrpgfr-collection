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

    this.animatedElement.addEventListener("click", this.animate.bind(this));
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
  }

  updateClicks() {
    Display.clickCount(this.updateCountElement, _.getClicks());
  }

  formatNumber(number) {
    return NumberFormatter.format(number);
  }

  animate(event) {

    const clickEffect = document.createElement("div");
    let lm = new LevelManagement();
    clickEffect.classList.add(this.mincls);
    clickEffect.textContent = NumberFormatter.format(lm.calculateClickRate());
    clickEffect.style.left = event.clientX + 15 + "px";
    clickEffect.style.top = event.clientY + 15 + "px";

    document.body.appendChild(clickEffect);

    let distance = event.clientY;

    const animationInterval = setInterval(() => {
      distance -= 3;
      clickEffect.style.top = distance + "px";
      if (distance < event.clientY - 50) {
        clearInterval(animationInterval);
        document.body.removeChild(clickEffect);
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