import Blob from "../Blob.js";
import _ from "../game/GameSave.js";
import NumberFormatter from "./NumberFormatter.js";

export default class LevelManagement {
    constructor() {

        const save = _.getSave();
        this.level = parseFloat(save.level);
        this.experience = parseFloat(save.exp);
        this.base = parseFloat(save.exp_to_level_base);
        this.difficulty = parseFloat(save.difficulty);

        this.experienceToNextLevel = this.calculateExperienceToNextLevel();
    }

    setCurrentDungeonLevel(level) {
        const save = _.getSave();
        save.current_dungeon_level = level;
        _.setSave(save);
    }

    getCurrentDungeonLevel() {
        return _.getSave().current_dungeon_level;
    }

    resetCurrentDungeonLevel() {
        const save = _.getSave();
        save.current_dungeon_level = null;
        _.setSave(save);
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

        let randomExperience = Math.floor(Math.random() * (maxExperience - minExperience + 1)) + minExperience;

        if (this.getCurrentDungeonLevel()) {
            const customExperience = this.calculateExperienceToNextLevelCustom(this.getCurrentDungeonLevel());
            randomExperience = Math.floor(customExperience * 0.1) + Math.floor(Math.random() * (customExperience * 0.2 + 1));
        }
        
        const gainedExperience = randomExperience / 2;
        this.gainExperience(gainedExperience);

        return gainedExperience;
    }

    distributeRandomHp() {
        const minHp = Math.floor(this.experienceToNextLevel * 0.1);
        const maxHp = Math.floor(this.experienceToNextLevel * 0.3);
        return Math.floor(Math.random() * (maxHp - minHp + 1)) + minHp;
    }

    distributeRandomMonster() {
        return Math.floor(Math.random() * 63) + 1;
    }

    calculateClickRate() {
        let autoClickValue = 0;
        const clickRate = Math.floor(this.difficulty * Math.pow(this.difficulty, this.level)) / 2;

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

    calculateExperienceToNextLevelCustom(level) {
        return Math.floor(this.base * Math.pow(this.difficulty, level));
    }
}
