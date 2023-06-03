import Events from "../tool/Events.js";
import NumberFormatter from "../tool/NumberFormatter.js";
import Observable from "../tool/Observable.js";
import EventEnd from "../EventEnd.js";
import LevelManagement from "../tool/LevelManager.js";

export default class AdvCounter extends Observable {

  constructor(eventStart, hp, id, hpcls, effectcls = 'min-effect', mincls = 'min-one') {

    super();

    let lm = new LevelManagement();
    this.hp = hp;
    this.rate = lm.calculateClickRate();
    this.eventStart = eventStart;

    this.effectcls = effectcls;
    this.mincls = mincls;
    this.hpcls = hpcls;

    document.querySelector(id).addEventListener("click", (event) =>
      this.decrement().animate(event).glow(event)
    );

    this.displayHp();

  }

  displayHp() {
    this.notify({
      type: Events.getDisplayClicks(),
      id: this.hpcls,
      value: this.hp
    });
  }

  decrement() {

    this.hp -= this.rate;
    if (this.hp <= 0) {
      new EventEnd();
    } else {
      this.displayHp();
    }

    return this;
  }

  animate(event) {

    const clickEffect = document.createElement("div");
    
    clickEffect.classList.add(this.mincls);
    clickEffect.textContent = NumberFormatter.format(this.rate);
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

    return this;
  }

  glow(event) {
    event.target.classList.add(this.effectcls);
    setTimeout(() => {
      event.target.classList.remove(this.effectcls);
    }, 500);
  }
}
