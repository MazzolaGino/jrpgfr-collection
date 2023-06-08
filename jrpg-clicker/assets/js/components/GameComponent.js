import Blob from "../lib/Blob.js";
import GameSave from "../lib/game/GameSave.js";
import AutoCounter from "../lib/counter/AutoCounter.js";
import Display from "../lib/tool/Display.js";
import Config from "../lib/resource/Config.js";
import Map from "../lib/Map.js";
import Menu from "../lib/game/Menu.js";

export default class GameComponent {

    constructor() {

        GameSave.init();
        new AutoCounter();
        new Map();
        const blob = new Blob('blob-clicker', {
            blob: '<img src="assets/img/ezgif-4-cad90254ac.gif">'
        });

        Display.blobLevel(Config.getLevelId(), GameSave.getSave().level);

        setInterval(() => {
          if(document.getElementById('modal-shop') && document.getElementById('modal-shop').innerHTML === '') {
            document.getElementById('modal-shop').innerHTML = 'No item available for purchase';
          }

          if(document.getElementById('modal-weapon-shop') && document.getElementById('modal-weapon-shop').innerHTML === '') {
            document.getElementById('modal-weapon-shop').innerHTML = 'No weapon available for purchase';
          }
        }, 500);

        let menu = new Menu();
      
     
    }


    moveDiv(divID) {
        var div = document.getElementById(divID);

        var offsetX = 0;
        var offsetY = 0;
        var isMouseDown = false;
        
        div.addEventListener('mousedown', function(e) {
          offsetX = e.clientX - div.offsetLeft;
          offsetY = e.clientY - div.offsetTop;
          isMouseDown = true;
          
          // Désactive la sélection de texte pendant le déplacement de la div
          div.style.userSelect = 'none';
        });
        
        document.addEventListener('mousemove', function(e) {
          if (isMouseDown) {
            var x = e.clientX - offsetX;
            var y = e.clientY - offsetY;
            div.style.left = x + 'px';
            div.style.top = y + 'px';
          }
        });
        
        document.addEventListener('mouseup', function() {
          isMouseDown = false;
          
          // Réactive la sélection de texte une fois le déplacement terminé
          div.style.userSelect = 'auto';
        });
      }
}