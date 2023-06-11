export default class Minion {
  constructor(name, level, image) {
    this.name = name;
    this.level = level;
    this.image = image;
    this.experience = 0;
  }

  gainExperience(exp) {
    this.experience += exp;
    while (this.experience >= this.getNextLevelExperience()) {
      this.level++;
      this.experience -= this.getNextLevelExperience();
      console.log(`${this.name} a atteint le niveau ${this.level} !`);
    }
  }

  getNextLevelExperience() {
    // Courbe de progression pour l'expérience
    return Math.floor(100 * Math.pow(1.2, this.level));
  }
}
