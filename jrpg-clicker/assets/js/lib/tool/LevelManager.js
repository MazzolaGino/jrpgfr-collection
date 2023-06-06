import Blob from "../Blob.js";
import _ from "../game/GameSave.js";
import NumberFormatter from "./NumberFormatter.js";

export default class LevelManagement {
    constructor() {

        this.level = parseFloat(_.getSave().level);
        this.experience = parseFloat(_.getSave().exp);
        this.base = parseFloat(_.getSave().exp_to_level_base);
        this.difficulty = parseFloat(_.getSave().difficulty);

        this.experienceToNextLevel = this.calculateExperienceToNextLevel();
    }

    setCurrentDungeonLevel(level) {
        let save = _.getSave();
        save.current_dungeon_level = level;
        _.setSave(save);
    }

    getCurrentDungeonLevel() {
        return _.getSave().current_dungeon_level;
    }

    resetCurrentDungeonLevel() {
        let save = _.getSave();
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
        
        let minExperience = Math.floor(this.experienceToNextLevel * 0.1);
        let maxExperience = Math.floor(this.experienceToNextLevel * 0.3);

        if(this.getCurrentDungeonLevel()) {
            minExperience = this.calculateExperienceToNextLevelCustom(this.getCurrentDungeonLevel()) * 0.1;
            maxExperience = this.calculateExperienceToNextLevelCustom(this.getCurrentDungeonLevel()) * 0.3;
        }
        
        
        const randomExperience = Math.floor(Math.random() * (maxExperience - minExperience + 1)) + minExperience;   
        
        
        this.gainExperience(randomExperience/5);

        return randomExperience/5;
    }
 
    distributeRandomHp() {

        let minExperience = Math.floor(this.experienceToNextLevel * 0.1);
        let maxExperience = Math.floor(this.experienceToNextLevel * 0.3);

        if(this.getCurrentDungeonLevel()) {
            minExperience = this.calculateExperienceToNextLevelCustom(this.getCurrentDungeonLevel()) * 0.1;
            maxExperience = this.calculateExperienceToNextLevelCustom(this.getCurrentDungeonLevel()) * 0.3;
        }

     
        const randomHp = Math.floor(Math.random() * (maxExperience - minExperience + 1)) + minExperience;

        return randomHp;
    }

    distributeRandomMonster() {
        return Math.floor(Math.random() * 63) + 1;
    }

    calculateClickRate() {

        let autoClickValue = 0;
        let clickRate = Math.floor(this.difficulty * Math.pow(this.difficulty, this.level)) / 10;

        _.getSave().weapon_shop.forEach(item => {
            autoClickValue += (((parseFloat(clickRate) * parseFloat(item.nb) * parseFloat(item.bonus))));
        });


        return clickRate + autoClickValue;
    }

    calculateAutoClick() {

        let autoClickValue = 0;
        let clickRate = Math.floor(this.difficulty * Math.pow(this.difficulty, this.level)) / 10;

        _.getSave().shop.forEach(item => {
            autoClickValue += (clickRate * parseFloat(item.nb) * parseFloat(item.bonus));
        });

        return autoClickValue * 2;
    }


    calculateExperienceToNextLevel() {
        return (Math.floor(this.base * Math.pow(this.difficulty, this.level)) * 3);
    }

    calculateExperienceToNextLevelCustom(level) {
        return (Math.floor(this.base * Math.pow(this.difficulty, level)) * 3);
    }
}