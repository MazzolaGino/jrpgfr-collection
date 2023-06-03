import Config from "./resource/Config.js";

export default class Map {

  constructor() {
    console.log('display');
    this.display();
    this.createGrid(30, 40, [  
      { x: 0, y: 12, value: 'city-1', action: (event) => { console.log(event.target.dataset.value)}}
    ]);
  }

  display() {
    document.getElementById('map-container').innerHTML = /* html */`
    <div class="blob-menu-header"> Map <span id="close-map"> X </div>
    <div class="grid-map-w1" id="grid-map"></div>
    `;
  }

  createGrid(numRows, numCols, actions) {

    document.getElementById('close-map').addEventListener('click', (event) => {
      document.getElementById('map-container').innerHTML = '';
    })

    var gridContainer = document.getElementById("grid-map");

    for (var i = 0; i < numRows; i++) {
      var row = document.createElement("div");
      row.className = "grid-map-row";

      for (var j = 0; j < numCols; j++) { 

        var randomNum = Math.floor(Math.random() * 100) + 1;

        let type = '';

        var cell = document.createElement("span");
        cell.className = `grid-map-cell ${type}`;
        cell.dataset.value = type;

        actions.find((action) => {
          if (action.y === i && action.x === j) {
            cell.dataset.value = 'path';
            cell.classList.add('path');
            cell.addEventListener('click', action.action);
          }
        });

        row.appendChild(cell);
      }

      gridContainer.appendChild(row);
    }

    
  }
}