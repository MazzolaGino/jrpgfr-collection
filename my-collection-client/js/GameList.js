import Component from "./Component.js";
import GameCard from "./GameCard.js";

export default class MainInput extends Component {

    constructor() {
        super({'game_list': ''}, 'game_list');
        this.uikit = null;
        this.selectedGame = null;
    }


    setUikit(uikit) {
        this.uikit = uikit;
    }

    handleAddToCollection(event)
    {
        console.log(event);
    }



    setList(list) {

        this.render();
        let html = '';

        list.forEach(element => {

            let gameCard = new GameCard(element);
            this.getElement().append(this.htmlToElement(gameCard.render()));
            gameCard.load();

        });
        
    }

    template() {

        return this.html = /* html */ `
            <div 
            class="" uk-grid 
            data-name="game_list" 
            data-method="setList" 
            data-action="wait"></div>
        `;
    }
}
