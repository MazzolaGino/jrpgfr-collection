import Config from "./resource/Config.js";

export default class BaseMap {

  constructor() { }

  loadCloseMap() {
    document.getElementById('close-map').addEventListener('click', (event) => {
      document.getElementById(Config.getMapContainerId()).innerHTML = '';
    });
  }

  viewZoneName(event) {
    document.getElementById(Config.getMapLocationId()).innerHTML = '- ' + event.target.dataset.value;
  }

  exitViewZoneName(event) {
    document.getElementById(Config.getMapLocationId()).innerHTML = '';
  }

  createGrid(numRows, numCols, line) {

    var gridContainer = document.getElementById(Config.getGridMapId());

    gridContainer.innerHTML = '';

    for (var i = 0; i < numRows; i++) {
      var row = document.createElement("div");
      row.className = "grid-map-row";

      for (var j = 0; j < numCols; j++) {

        var cell = document.createElement("span");
        
        cell.className = `grid-map-cell`;
        cell.dataset.value = '';

        line.find((action) => {

          if (action.y === i && action.x === j) {

            cell.dataset.value = action.value;

            cell.classList.add('path');

            if(action.type && action.type === 'loot') {
              cell.style.background = 'url(assets/img/icons/I_Chest01.png)';
              cell.style.backgroundSize = 'cover';
              cell.style.backgroundPosition = 'center';
              cell.classList.remove('path');
            }

            if (action.zone) {
              cell.addEventListener('click', (event) => action.zone(event));
            }

            if (action.action) {
              cell.addEventListener('click', (event) => action.action(event));
            }

            if(action.img) {
              cell.style.backgroundImage = 'url(assets/img/I_Chest01.png)';
              cell.style.backgroundSize = 'cover';
              cell.style.backgroundPosition = 'center';
            }

            cell.addEventListener('mouseover', (event) => {this.viewZoneName(event)});
            cell.addEventListener('mouseleave', (event) => {this.exitViewZoneName(event)});
          }

        });

        row.appendChild(cell);
      }

      gridContainer.appendChild(row);
    }
  }
}