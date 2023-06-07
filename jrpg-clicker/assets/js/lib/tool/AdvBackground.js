class AdvBackground {
  
  constructor() {

    this.currentBackground = null;

  }

  static getInstance() {
    if (!AdvBackground.instance) {
      AdvBackground.instance = new AdvBackground();
    }

    return AdvBackground.instance;
  }

  set(cls) {
    this.currentBackground = cls;
  }

  get() {
    return this.currentBackground;
  }
}

const instance = AdvBackground.getInstance();

export default instance;

