class AutoBattle {
  constructor() {

    this.auto = null;

  }

  static getInstance() {
    if (!AutoBattle.instance) {
      AutoBattle.instance = new AutoBattle();
    }
    return AutoBattle.instance;
  }

  start() {
    if(!this.isStarted()) {
      this.auto = setInterval(() => {
        if (document.querySelector('#adv_character img')) {
          document.querySelector('#adv_character img').click();
        }
      }, 500);
    }
  }

  isStarted() {

    if(this.auto !== null) {
      return true;
    }

    return false;
  }

  stop() {
    clearInterval(this.auto);
    this.auto = null;
  }
}

const instance = AutoBattle.getInstance();

export default instance;

