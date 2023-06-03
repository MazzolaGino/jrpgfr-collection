import _ from "../game/GameSave.js";

export default class LevelManagement {
    constructor() {

        this.level = parseFloat(_.getSave().level);
        this.experience = parseFloat(_.getSave().exp);
        this.base = parseFloat(_.getSave().exp_to_level_base);
        this.difficulty = parseFloat(_.getSave().difficulty);

        this.experienceToNextLevel = this.calculateExperienceToNextLevel();
    }

    gainExperience(amount) {

        this.experience += amount;

        if (this.experience >= this.experienceToNextLevel) {
            this.levelUp();
        }

    }

    levelUp() {

        this.level++;
        this.experience -= this.experienceToNextLevel;
        this.experienceToNextLevel = this.calculateExperienceToNextLevel();

    }

    distributeRandomExperience() {
        const minExperience = Math.floor(this.experienceToNextLevel * 0.1);
        const maxExperience = Math.floor(this.experienceToNextLevel * 0.3);
        const randomExperience = Math.floor(Math.random() * (maxExperience - minExperience + 1)) + minExperience;
        this.gainExperience(randomExperience);

        return randomExperience;
    }

    distributeRandomHp() {

        const minExperience = Math.floor(this.experienceToNextLevel * 0.1);
        const maxExperience = Math.floor(this.experienceToNextLevel * 0.3);
        const randomHp = Math.floor(Math.random() * (maxExperience - minExperience + 1)) + minExperience;

        return randomHp;
    }

    distributeRandomMonster() {
        return Math.floor(Math.random() * 63) + 1;
    }

    calculateClickRate() {
        return Math.floor(this.difficulty * Math.pow(this.difficulty, this.level));
    }

    calculateExperienceToNextLevel() {
        return Math.floor(this.base * Math.pow(this.difficulty, this.level));
    }
}