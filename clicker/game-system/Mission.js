export default class Mission {
  constructor(id = 0, name = '', minions = [], level = 0) {
    this.id = id;
    this.name = name;
    this.minions = minions;
    this.level = level;
    this.percent = 0;
    this.isRunning = false;
    this.rewards = [];
    this.startTime = 0;
    this.endTime = 0;
    this.pauseDuration = 0;
    this.pauseInterval = null;
  }

  static import(m) {
    let _m = new Mission();

    _m.id = m.id;
    _m.name = m.name;
    _m.level = m.level;
    _m.percent = m.percent;
    _m.startTime = m.startTime;
    _m.endTime = m.endTime;

    m.minions.map((id) => {
      _m.minions.push(MinionRepository.getById(id));
    });

    return _m;
  }

  export() {

    return {
      id: this.id,
      name: this.name,
      minions: this.minions,
      level: this.level,
      percent: this.percent,
      startTime: this.startTime,
      endTime: this.endTime,
    };
    
  }

  add(type, m) {
    if (type === 'minion') {
      this.minions.push(m.id);
    }
  }

  start() {
    this.resume();
    this.startTime = new Date().getTime();
    const randomMultiplier = Math.random() * 10;
    this.endTime = this.startTime + (this.level * 1000 * randomMultiplier) + this.pauseDuration;
  }

  pause() {
    this.pauseStartTime = new Date().getTime();
    this.pauseInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedSeconds = Math.floor((currentTime - this.pauseStartTime) / 1000);
      this.pauseDuration += elapsedSeconds;
    }, 1000);
  }

  resume() {
    if (this.pauseInterval) {
      clearInterval(this.pauseInterval);
      this.pauseInterval = null;
    }
  }

  stop() {
    this.startTime = 0;
    this.endTime = 0;
    this.pauseDuration = 0;
    this.isRunning = false;

    if (this.pauseInterval) {
      clearInterval(this.pauseInterval);
    }
  }

  getPercentage() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - this.startTime;
    const totalDuration = this.endTime - this.startTime - this.pauseDuration * 1000;
    let completionPercentage = (elapsedTime / totalDuration) * 100;
    completionPercentage = Math.min(completionPercentage, 100);

    completionPercentage = parseFloat(completionPercentage).toFixed(2)
    this.percent = completionPercentage;
    return completionPercentage;
  }

  getCurrentMinionsSumLevel() {
    return this.minions.reduce((sum, minion) => sum + parseInt(MinionRepository.getById(minion).level), 0);
  }

  checkMinionsValidity() {
    return this.getCurrentMinionsSumLevel() <= this.level;
  }

  generateRewards() {
    const numObjects = this.calculateNumObjects();

    for (let i = 0; i < numObjects; i++) {
      const object = ObjetFactory.getRandomObjet();
      this.rewards.push(object);
    }

    return this.rewards;
  }

  levelUpMinions() {
    this.minions.forEach((minion) => {
      const experience = this.level * 10;
      minion.gainExperience(experience);
    });
  }

  calculateNumObjects() {
    const totalLevel = this.minions.reduce((sum, minion) => sum + minion.level, 0);
    return Math.floor(totalLevel / 3);
  }
}
