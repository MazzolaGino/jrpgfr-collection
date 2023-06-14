export default class Minion {
  constructor(id = 0, name = '', level = 0, image = '') {
    this.id = id;
    this.name = name;
    this.level = level;
    this.image = image;
    this.experience = 0;
  }

  static import(m) {

    let minion = new Minion(); 

    minion.id = m.id; 
    minion.name = m.name;
    minion.level = m.level;
    minion.image = m.image;
    minion.experience = m.experience;

    return minion;
  }

  export(id = false){
    
    if(id) {
      return this.id;
    }

    return {
      id: this.id,
      name: this.name,
      level: this.level,
      image: this.image,
      experience: this.experience
    }
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
