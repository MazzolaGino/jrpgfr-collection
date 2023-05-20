import Component from './Component.js';
import Navbar from "./Navbar.js";
import MainInput from './MainInput.js';
import CookieManager from './CookieManager.js';


export default class LoggedContent extends Component {


    constructor() {
        super({});

  
        this.uikit = null;
    }


    setUikit(uikit) {
        this.uikit = uikit;
    }

 
    render() {

        super.render();
        const main = new MainInput();
        main.setUikit(this.uikit);
        main.render();
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
                                        <li><a href="#">Ma Collection</a></li>
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
        </div>

        <div class="uk-section-small uk-section-default header">
            <div class="uk-container uk-container-large">
                <div id="main_input"></div>
            </div>
        </div>
        <div class="uk-section-small">
            <div class="uk-container uk-container-large">
                <div class="uk-child-width-1-1">
                    <div id="game_list"></div>
                </div>
            </div>
        </div>
        `;
    }
}