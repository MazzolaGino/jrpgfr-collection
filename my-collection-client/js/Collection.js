import Navbar from "./Navbar.js";
import CookieManager from './CookieManager.js';
import CustomComponent from './CustomComponent.js';
import Spinner from './Spinner.js';
import Call from "./Call.js";
import Config from "./Config.js";
import Endpoint from "./Endpoints.js";
import CollectionItem from "./CollectionItem.js";
import CollectionForm from "./CollectionForm.js";
import Field from "./Field.js";

export default class Collection extends CustomComponent {

    constructor() {

        super({
            elements: [
                { name: 'main_input', event: 'keypress' },
                { name: 'game_list' }
            ], container: 'app'
        });

        this.render();
        let call = new Call(Config.getRemoteUrl());

      

        this.platform = new Field('platforms-select', {}, 'select', 'select');
        this.platform.classes = 'uk-select';
     
        
        call.post(Endpoint.getPlatforms(), (success) => {

            this.platform.options = success.map(item => {
                return {
                  value: item.id,
                  label: item.name
                };
              });

              this.advance = new Field('advance-select', {}, 'select', 'select');
              this.advance.classes = 'uk-select';
              
              this.advance.options = [
                  {value: -1, label : 'Choisis un avancement'},
                  {value: 0, label : 'Non commencé'},
                  {value: 1, label : 'En cours'},
                  {value: 2, label : 'terminé'},
              ]
      
              this.advance.load('advance-select');

            this.platform.load('platforms-select');

           
        }, (error) => {});

    }

    handleEvent(event) {
        let prop = super.handleEvent(event);

        if (prop.name === 'main_input') {
            if (event.keyCode === 13) {

                let sp = new Spinner('spinner');
                let call = new Call(Config.getRemoteUrl());

                sp.show('Nous recherchons dans ta collection ...');
                this.getElement('game_list').innerHTML = '';

                call.post(Endpoint.getCollection(event.target.value, this.advance.value, this.platform.value),
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
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-search uk-search-large uk-width-1-1">
                                <span uk-search-icon></span>
                                <input type="text"
                                data-name="main_input" 
                                class="uk-search-input uk-form-large"
                                placeholder="Tape un titre + Enter !" />
                            </div>
                        
                            <div class="uk-width-1-2@s">
                                <div class="uk-form-controls" id="advance-select">
                                    <span class="spinner" uk-spinner> Chargement des avancements</span>
                                </div>
                            </div>
                            
                            <div class="uk-width-1-2@s" id="platforms-select">
                                <span class="spinner" uk-spinner> Chargement de la liste de consoles</span>
                            </div>
                            <div class="uk-width-1-2@s">
                                <div id="spinner"></div>
                                <div id="spinner2"></div>
                            </div>
                        </div>
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