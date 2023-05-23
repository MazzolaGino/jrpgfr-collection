import Component from "./Component.js";
import Navbar from "./Navbar.js";
import Call from "./Call.js";
import Config from "./Config.js";
import CookieManager from "./CookieManager.js";


export default class UnloggedContent extends Component {

    constructor() {

        super({
            username: '',
            password: '',
            login: '',
            error: ''
        });

        this.uikit = null;

        CookieManager.deleteCookie('username');
        CookieManager.deleteCookie('token');
    }

    setUikit(uikit) {
        this.uikit = uikit;
    }

    handleLogin(event) {

        const call = new Call(Config.getAuthenticationUrl());

        CookieManager.setCookie('username', this.get('username'));

        const data = {
            username: this.get('username'),
            password: this.get('password')
        };

        call.post(
            data,
            (response) => {
                if (response.token) {
                    this.cookies.setCookie('token', response.token);
                    this.navigate('home');
                }
            },
            (error) => {
                this.set('error', 'Nom d\'utilisateur ou mot de passe invalide');
            }
        );
    }

    handleUsername(event) {
        this.set('username', event.target.value);
    }

    handlePassword(event) {
        this.set('password', event.target.value);
    }


    template() {
        return /* html */`
        <div uk-sticky="media: 960" class="uk-navbar-container tm-navbar-container uk-sticky uk-active" style="position: fixed; top: 0px; width: 1903px;">
            <div class="uk-container uk-container-expand">
                ${(new Navbar()).renderHtml()}
            </div>
        </div>
        <div class="content-background">
            <div class="uk-section-large">
                <div class="uk-container uk-container-large">
                    <div uk-grid class="uk-child-width-1-1@s uk-child-width-2-3@l">
                        <div class="uk-width-1-1@s uk-width-1-5@l uk-width-1-3@xl"></div>
                        <div class="uk-width-1-1@s uk-width-3-5@l uk-width-1-3@xl">
                            <div class="uk-card uk-card-default">
                                <div class="uk-card-header">
                                    Bienvenue sur votre collection !
                                </div>
                                <div class="uk-card-body">
                                    <center>
                                        <h2>Connexion</h2><br />
                                    </center>

                                    <fieldset class="uk-fieldset">
                                        <p style="color:red" data-name="error"></p>
                                    </fieldset>
                                    
                                    <fieldset class="uk-fieldset">

                                        <div class="uk-margin">
                                            <div class="uk-position-relative">
                                                <span class="uk-form-icon ion-android-person"></span>
                                                <input data-method="handleUsername" data-action="input" data-name="username" name="email" class="uk-input" type="text" placeholder="Nom d'utilisateur">
                                            </div>
                                        </div>

                                        <div class="uk-margin">
                                            <div class="uk-position-relative">
                                                <span class="uk-form-icon ion-locked"></span>
                                                <input data-method="handlePassword" data-action="input" data-name="password" name="password" class="uk-input" type="password" placeholder="Mot de passe">
                                            </div>
                                        </div>

                                        <div class="uk-margin">
                                            <a href="${Config.getPasswordResetUrl()}">Mot de passe perdu ?</a>
                                        </div>

                                        <div class="uk-margin">
                                            <button data-method="handleLogin" data-action="click" type="submit" data-name="login" class="uk-button uk-button-default">
                                                <span class="ion-forward"></span>&nbsp; Go ! </button>
                                        </div>

                                        <hr />
                        
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-1@s uk-width-1-5@l uk-width-1-3@xl"></div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}