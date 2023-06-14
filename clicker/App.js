import Layout from "./layout-system/Layout.js";
import HarvesterDisplay from "./layout-system/HarvesterDisplay.js";
import Game from "./game-system/Game.js";
import MissionRepository from "./repository-system/MissionRepository.js";
import MissionFactory from "./factory-system/MissionFactory.js";
import MissionDisplay from "./layout-system/MissionDisplay.js";




window.onload = (event) => {

    let mission = MissionFactory.generateMission();

    MissionDisplay.display(mission);
    
    Game.start();
    new Layout();
    new HarvesterDisplay();

};



