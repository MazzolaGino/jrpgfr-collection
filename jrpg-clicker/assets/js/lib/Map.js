import LibertyTown from '../lib/zone/LibertyTown.js';
import BaseMap from './BaseMap.js';
import Config from './resource/Config.js';

export default class Map extends BaseMap {

  constructor() {
    super();

    this.display();

    this.createGrid(30, 40, [
      { x: 3, y: 10, value: 'Liberty Town', zone: () => {(new LibertyTown()).display()} },
      { x: 7, y: 10, value: 'Sacred Stone'},
      { x: 8, y: 6, value: 'Sacred Forest'},
      { x: 6, y: 13, value: 'Mountain Dungeon'},
    ]);

    this.loadCloseMap();
  }

  display() {
    document.getElementById(Config.getMapContainerId()).innerHTML = /* html */`
    <div class="blob-menu-header"> Map <span id="map-location"></span><span id="close-map"> X </div>
    <div class="grid-map-w1" id="grid-map"></div>
    `;
  }
}