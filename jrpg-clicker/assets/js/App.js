import GameComponent from './components/GameComponent.js';


document.addEventListener("DOMContentLoaded", () => {

    const img = document.querySelector("*");
    img.ondragstart = () => false;

    const game = new GameComponent();
});