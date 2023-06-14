import Mission from "../game-system/Mission.js";
import Id from "../tools/Id.js";

export default class MissionFactory {
        
    static generateMission() { 
        return new Mission(Id.get('mission-'), MissionFactory.generateMissionName(), [], MissionFactory.generateRandomLevel());
    }

    static generateMissionName() {
        var adjectives = ['Secret', 'Dangerous', 'Covert', 'Stealthy', 'Intricate', 'Clandestine', 'Critical', 'Undercover', 'Espionage', 'Surreptitious', 'High-Stakes', 'Black Ops', 'Top-Secret'];
        var nouns = ['Operation', 'Mission', 'Assignment', 'Task', 'Objective', 'Covert Operation', 'Black Ops Mission', 'Espionage Task', 'Stealth Mission', 'Infiltration Assignment', 'Surveillance Operation', 'Sabotage Task', 'Assassination Mission', 'Reconnaissance Operation', 'Undercover Assignment'];
        var randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        var randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        var missionName = randomAdjective + ' ' + randomNoun;
        return missionName;
    }

    static generateRandomLevel() {
        return Math.floor(Math.random() * 100) + 1;
    }
}