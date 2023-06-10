import _ from "../game/GameSave.js";
import DungeonManager from "../dungeon_system/DungeonManager.js";
export default class LevelManagement {
    constructor() {

        const save = _.getSave();
        this.level = parseFloat(save.level);
        this.experience = parseFloat(save.exp);
        this.base = parseFloat(save.exp_to_level_base);
        this.difficulty = parseFloat(save.difficulty);

        this.experienceToNextLevel = this.calculateExperienceToNextLevel();
    }

    generateRandomNumber(min, max) {
        // Vérification des paramètres
        if (min > max) {
          throw new Error("La valeur minimale ne peut pas être supérieure à la valeur maximale.");
        }
      
        // Calcul du nombre aléatoire
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      
        return randomNumber;
    }

    getCurrentDungeonLevel() {
        return DungeonManager.getInstance().current.level;
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
        let divider  = this.generateRandomNumber(15, 20);
        let gain = this.calculateExperienceToNextLevelCustom(this.getCurrentDungeonLevel())/divider;
        this.gainExperience(gain);
        return gain;
    }

    distributeRandomHp() {
        return this.distributeRandomExperience() * 2;
    }

    distributeRandomBossHp() {
        return this.distributeRandomExperience() * 20; 
    }

    distributeRandomMonster() {
        return Math.floor(Math.random() * 63) + 1;
    }

    distributeRandomBoss() {
        return Math.floor(Math.random() * 10) + 1;
    }

    calculateClickRate() {
        let autoClickValue = 0;
        const clickRate = Math.floor(this.difficulty * Math.pow(this.difficulty, this.level)) / 2;

        _.getSave().weapon_shop.forEach(item => {
            autoClickValue += parseFloat(clickRate * item.nb * item.bonus);
        });

        return clickRate + autoClickValue;
    }

    calculateClickRateCustom() {
        let autoClickValue = 0;
        const clickRate = Math.floor(this.difficulty * Math.pow(this.difficulty, this.getCurrentDungeonLevel())) / 2;

        _.getSave().weapon_shop.forEach(item => {
            autoClickValue += parseFloat(clickRate * item.nb * item.bonus);
        });

        return clickRate + autoClickValue;
    }

    calculateAutoClick() {
        let autoClickValue = 0;
        const clickRate = Math.floor(this.difficulty * Math.pow(this.difficulty, this.level)) / 2;

        _.getSave().shop.forEach(item => {
            autoClickValue += clickRate * parseFloat(item.nb) * parseFloat(item.bonus);
        });

        return autoClickValue * 2;
    }

    calculateExperienceToNextLevel() {
        return Math.floor(this.base * Math.pow(this.difficulty, this.level));
    }

    calculateExperienceToNextLevelCustom() {
        return Math.floor(this.base * Math.pow(this.difficulty, this.getCurrentDungeonLevel()));
    }
}
