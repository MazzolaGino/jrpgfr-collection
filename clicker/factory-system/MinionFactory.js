import Minion from "../game-system/Minion.js";
import Id from "../tools/Id.js";

export default class MinionFactory {

    static generateRandomName() {

        const adjectives = [
            'Brave', 'Clever', 'Mighty', 'Swift', 'Wise', 'Fierce', 'Noble', 'Sneaky', 'Savage', 'Loyal',
            'Daring', 'Powerful', 'Agile', 'Intelligent', 'Fearless', 'Honorable', 'Stealthy', 'Vicious', 'Devoted', 'Resourceful'
        ];

        const nouns = [
            'Warrior', 'Mage', 'Rogue', 'Hunter', 'Knight', 'Sorcerer', 'Thief', 'Archer', 'Barbarian', 'Paladin',
            'Assassin', 'Wizard', 'Ranger', 'Champion', 'Berserker', 'Priest', 'Scout', 'Swashbuckler', 'Sniper', 'Enforcer'
        ];

        const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
        const randomNounIndex = Math.floor(Math.random() * nouns.length);

        const randomAdjective = adjectives[randomAdjectiveIndex];
        const randomNoun = nouns[randomNounIndex];

        return `${randomAdjective} ${randomNoun}`;
    }
    
    static generateMinion(level) {
        return new Minion(
            Id.get('minion-'),
            MinionFactory.generateRandomName(),
            level,
            `assets/img/minion/1 (${MinionFactory.generateRandomNumber()}).png`
        );
    }

    static generateRandomNumber() {
        return Math.floor(Math.random() * 16) + 1;
    }
}