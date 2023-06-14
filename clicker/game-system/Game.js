
import MinionRepository from "../repository-system/MinionRepository.js";
import MissionRepository from "../repository-system/MissionRepository.js";
import MinionDisplay from "../layout-system/MinionDisplay.js"
import MissionDisplay from "../layout-system/MissionDisplay.js"
import ShopDisplay from "../layout-system/ShopDisplay.js"

import Shop from "./Shop.js";
export default class Game {

    static start() {

        let minions = MinionRepository.getList();
        let missions = MissionRepository.getList();
        let shop = Shop.getList();
        console.log(shop);

        shop.forEach((item) => {
            ShopDisplay.display(item);
        });

        minions.forEach((minion) => {
            MinionDisplay.display(minion);
        });

        missions.forEach((mission) => {
            MissionDisplay.display(mission);
        });

    }
}