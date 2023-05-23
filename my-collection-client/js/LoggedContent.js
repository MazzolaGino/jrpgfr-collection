
import Navbar from "./Navbar.js";
import CookieManager from './CookieManager.js';
import CustomComponent from './CustomComponent.js';
import Spinner from './Spinner.js';
import Call from "./Call.js";
import Config from "./Config.js";
import Endpoint from "./Endpoints.js";
import GameCard from "./GameCard.js";

export default class LoggedContent extends CustomComponent {

    constructor() {

        const elements = [
            { name: 'main_input', event: 'keypress' },
            { name: 'game_list' }
        ];

        super({ elements, container: 'app' });
        this.render();

        this.elts = [];

    }

    handleEvent(event) {
        let prop = super.handleEvent(event);

        if (prop.name === 'main_input') {
            if (event.keyCode === 13) {

                let sp = new Spinner('spinner');
                let call = new Call(Config.getRemoteUrl());

                sp.show('Recherche de ressources ...');

                call.post(Endpoint.getGameList(event.target.value),
                    (response) => {
                        this.getElement('game_list').innerHTML = ''; 
                        this.elts = response;
                        response.forEach(element => {

                            let gameCard = new GameCard(element, this);

                            this.getElement('game_list').append(this.htmlToElement(gameCard.render()));

                            gameCard.load();

                        });
                        sp.hide();
                    },

                    (error) => {

                    }
                );
            }
        }
    }

    setUikit(uikit) {
        this.uikit = uikit;
    }

    template() {

        const nav = new Navbar();

        return /* html */`
        
        <div uk-sticky class="uk-navbar-container tm-navbar-container uk-active">
            <div class="uk-container uk-container-expand">
                <nav uk-navbar>
                    <div class="uk-navbar-left">
                        ${nav.renderHtml()}
                    </div>
                    <div class="uk-navbar-right uk-light">
                        <ul class="uk-navbar-nav">
                        <li class="uk-active">
                            <a href="#">Bienvenue ${CookieManager.getCookie('username')} &nbsp;<span class="ion-ios-arrow-down"></span></a>
                            <div uk-dropdown="pos: bottom-right; mode: click; offset: -17;">
                                <ul class="uk-nav uk-navbar-dropdown-nav">
                                    <li class="uk-nav-header">Menu</li>
                                    <li><a href="collection">Ma Collection</a></li>
                                    <li><a href="#">Mes Envies</a></li>
                                    <li class="uk-nav-header">JRPG</li>
                                    <li><a href="home">Rechercher</a></li>
                                    <li class="uk-nav-header">Mon Profil</li>
                                    <li><a href="login">Déconnexion</a></li>
                                </ul>
                            </div>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="uk-section-small uk-section-default header">
                <div class="uk-container uk-container-large">
                    <fieldset class="uk-fieldset">
                        <div class="uk-margin">
                        <div class="uk-search uk-search-default uk-width-1-1">
                            <span uk-search-icon></span>
                            <input type="text"
                                data-name="main_input" 
                                class="uk-search-input"
                                placeholder="Tape un titre + Enter !" />
                        </div>
                        </div>
                        <div class="uk-margin">
                        <div id="spinner"></div>
                        </div>
                    </fieldset>
                    <div id="spinner2"></div>
                </div>
            </div>
        </div>
        <div class="uk-section-small">
            <div class="uk-container">

                <div data-name="game_list">

                </div>
        
            </div>
        </div>
        `;
    }
}