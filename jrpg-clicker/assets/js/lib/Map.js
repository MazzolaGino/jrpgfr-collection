import LibertyTown from '../lib/zone/LibertyTown.js';
import BaseMap from './BaseMap.js';
import Config from './resource/Config.js';
import SacredStone from './zone/SacredStone.js';
import SacredForest from './zone/SacredForest.js';

export default class Map extends BaseMap {

  constructor() {
    super();

    this.display();

    this.createGrid(30, 40, [
      {x: 3, y: 10, value: 'Liberty Town', zone: () => {(new LibertyTown()).display()}},
      {x: 7, y: 10, value: 'Sacred Stone - Dungeon lvl 2', zone: () => {(new SacredStone()).display()}},
      {x: 8, y: 6, value: 'Sacred Forest - Dungeon lvl 5', zone: () => {(new SacredForest()).display()}},
      {x: 6, y: 13, value: 'Mountain Dungeon'},
    ]);
  }

  display() {
    document.getElementById(Config.getMapContainerId()).innerHTML = /* html */`
    <div class="blob-menu-header fade-in-animation"> Map <span id="map-location"></span></div>
    <div class="grid-map-w1 fade-in-animation" id="grid-map"></div>
    `;
  }
}