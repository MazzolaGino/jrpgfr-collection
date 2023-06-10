import Events from "../tool/Events.js";
import NumberFormatter from "../tool/NumberFormatter.js";
import Observable from "../tool/Observable.js";
import EventEnd from "../EventEnd.js";
import LevelManagement from "../tool/LevelManager.js";
import AutoBattle from "../tool/AutoBattle.js";
import DungeonManager from "../dungeon_system/DungeonManager.js";

export default class AdvCounter extends Observable {

  constructor(boss, hp, id, hpcls, effectcls = 'min-effect', mincls = 'min-one') {

    super();
    
    let lm = new LevelManagement();
    this.boss = boss;
    this.hp = hp;
    this.rate = lm.calculateClickRate();
    this.id = id;

    this.effectcls = effectcls;
    this.mincls = mincls;
    this.hpcls = hpcls;
    this.autoB = false;
    this.eventDecrement = (event) => this.decrement(event);

    document.querySelector(this.id).addEventListener("click", this.eventDecrement.bind(this), true);

    this.displayHp();

  }
  
  displayHp() {
    this.notify({
      type: Events.getDisplayClicks(),
      id: this.hpcls,
      value: this.hp
    });
  }

  decrement(event) {
    
    this.hp -= this.rate;

    if (this.hp <= 0) {

      if(this.boss === true) {
        DungeonManager.getInstance().defeatBoss();
      }
      
      new EventEnd(this.boss);
    
    } else {
      this.displayHp();
      this.animateBlobCount(this.rate);
      this.glow(event);
    }
    
    return this;
  }

  animateBlobCount(bonus) {

    const blobCount = document.getElementById("adv_count");

    const elementTop = blobCount.offsetTop;
    const elementLeft = blobCount.offsetLeft;
    const positionTop = elementTop - 10;

    const displayElement = document.createElement("div");
    displayElement.textContent = '- ' + NumberFormatter.format(bonus);
    displayElement.style.position = "absolute";
    displayElement.style.top = positionTop + "px";
    displayElement.style.left = (elementLeft + 100) + "px";
    displayElement.style.color = 'red';
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
    event.target.classList.add(this.effectcls);
    setTimeout(() => {
      event.target.classList.remove(this.effectcls);
    }, 500);
  }
}