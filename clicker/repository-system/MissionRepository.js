import MissionFactory from "../factory-system/MissionFactory.js";
import Mission from "../game-system/Mission.js";
import Save from "../tools/Save.js";

export default class MissionRepository {

    static getList() {
        
        let missions = [];
        let list = JSON.parse(Save.get('missions')); 

        if(list) {
            list.forEach((element) => {
                missions.push(MinionRepository.getById(element));
            });
        }

        return missions;
    }

    static getById(id){
        const m = Save.get(id);
        return Mission.import(m);
    }

    static save(m) {
        Save.set(m.id, JSON.stringify(m.export()));
    }

    static create(){
        const mission = MissionFactory.generateMission();
        let missions = [];

        const savedMissions = Save.get('missions');
        if (savedMissions) {
            missions = JSON.parse(savedMissions);
        }

        missions.push(mission.id);

        Save.set('missions', JSON.stringify(missions));

        return mission;
    }
}