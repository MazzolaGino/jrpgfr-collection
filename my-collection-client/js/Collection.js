import Navbar from "./Navbar.js";
import CookieManager from './CookieManager.js';
import CustomComponent from './CustomComponent.js';
import Spinner from './Spinner.js';
import Call from "./Call.js";
import Config from "./Config.js";
import Endpoint from "./Endpoints.js";
import CollectionItem from "./CollectionItem.js";
import CollectionForm from "./CollectionForm.js";

export default class LoggedContent extends CustomComponent {
    constructor() {
        super({ elements: [
            { name: 'main_input', event: 'keypress' },
            { name: 'game_list' }
        ], container: 'app' });
        this.render();
    }

    handleEvent(event) {
        let prop = super.handleEvent(event);

        if (prop.name === 'main_input') {
            if (event.keyCode === 13) {
                let sp = new Spinner('spinner');
                let call = new Call(Config.getRemoteUrl());

                sp.show('Nous recherchons dans ta collection ...');
                this.getElement('game_list').innerHTML = '';

                call.post(Endpoint.getCollection(this.data['main_input']),
                    (response) => {
                    
                        response.collection.forEach(element => {

                            let gameCard = new CollectionItem(element);
                            this.getElement('game_list').append(this.htmlToElement(gameCard.render()));
                            gameCard.load();
                            let gameForm = new CollectionForm(element);
                            gameForm.load();
                        });
                        sp.hide();
                    },
                    (error) => {
                        // Gérer l'erreur
                    }
                );
            }
        }
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
                <div class="uk-container uk-container-large">
                    <div class="uk-child-width-1-1">
                        <ul class="uk-list uk-list-striped" data-name="game_list"></ul>
                    </div>
                </div>
            </div>`;
    }
}