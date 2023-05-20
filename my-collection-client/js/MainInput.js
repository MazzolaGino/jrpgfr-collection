import Component from "./Component.js";
import GameList from "./GameList.js";
import CookieManager from "./CookieManager.js";

export default class MainInput extends Component {

    constructor() {

        super({
            'main_input': ''
        }, 'main_input');

        this.uikit = null;

        this.game_list = new GameList();

    }


    setUikit(uikit) {
        this.uikit = uikit;
        this.game_list.setUikit(uikit);
    }



    handleMainInput(event) {


        if (event.keyCode === 13) {
            const data = {
                controller: 'GameEndpoint',
                action: 'getList',
                params: {
                    token: CookieManager.getCookie('token'),
                    search: event.target.value
                }
            };

            this.displaySpinner('spinner');    
            
            this.call.post(data,

                (response) => {
                    this.game_list.setList(response);
                    
                    this.removeSpinner('spinner');
                },

                (error) => {

                }
            );
        }

    }

    template() {

        return this.html = /* html */`
            <fieldset class="uk-fieldset">
                <div class="uk-margin">
                    <div class="uk-search uk-search-default uk-width-1-1">
                        <span uk-search-icon></span>
                        <input type="text"
                            data-method="handleMainInput" 
                            data-action="keydown"
                            data-name="main_input" 
                            class="uk-search-input"
                            placeholder="Tape un titre + Enter !" />
                    </div>
                </div>
                <div class="uk-margin">
                    <div id="spinner"></div>
                </div>
            </fieldset>`;
    }
}
