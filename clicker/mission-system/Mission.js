import ObjetFactory from "./mission-factory/ObjetFactory.js";

export default class Mission {
  constructor(minions, level) {
    this.minions = minions;
    console.log(minions);
    this.level = level;
    this.timer = null;
    this.isRunning = false;
    this.rewards = [];
  }

  start() {
    if (this.isRunning) {
      console.log('La mission est déjà en cours.');
      return;
    }

    if (!this.checkMinionsValidity()) {
      console.log('Les minions ne satisfont pas les conditions requises pour cette mission.');
      return;
    }

    this.isRunning = true;
    this.timer = setTimeout(() => {
      this.complete();
    }, this.level * 1000); // Durée de la mission basée sur le niveau

    console.log('La mission a commencé.');
  }

  pause() {
    if (!this.isRunning) {
      console.log('La mission n\'est pas en cours.');
      return;
    }

    clearTimeout(this.timer);
    this.timer = null;
    this.isRunning = false;

    console.log('La mission est en pause.');
  }

  stop() {
    if (!this.isRunning) {
      console.log('La mission n\'est pas en cours.');
      return;
    }

    clearTimeout(this.timer);
    this.timer = null;
    this.isRunning = false;

    console.log('La mission a été arrêtée.');
  }

  complete() {
    if (!this.isRunning) {
      console.log('La mission n\'est pas en cours.');
      return;
    }

    this.isRunning = false;
    this.timer = null;

    // Génération aléatoire des récompenses de mission
    this.generateRewards();

    // Augmentation du niveau des minions
    this.levelUpMinions();

    console.log('La mission est terminée.');
  }

  checkMinionsValidity() {
    const totalMinionLevel = this.minions.reduce((sum, minion) => sum + minion.level, 0);

    return totalMinionLevel <= this.level;
  }

  generateRewards() {

    const numObjects = this.calculateNumObjects(); // Calcul du nombre d'objets à donner
    console.log(`Récompense : ${numObjects} objets`);

    // Génération des objets de récompense
    for (let i = 0; i < numObjects; i++) {
      const object = ObjetFactory.getRandomObjet();
      this.rewards.push(object);
    }
    console.log(this.rewards);
    console.log(this.minions);
    return this.rewards;
  }

  levelUpMinions() {
    this.minions.forEach((minion) => {
      const experience = this.level * 10; // Calcul de l'expérience basée sur le niveau de la mission
      minion.gainExperience(experience);
    });
  }

  calculateNumObjects() {
    const totalLevel = this.minions.reduce((sum, minion) => sum + minion.level, 0);
    return Math.floor(totalLevel / 3); // 1 objet pour chaque tranche de 3 niveaux
  }
}