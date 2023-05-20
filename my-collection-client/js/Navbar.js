import Component from "./Component.js";

export default class Navbar extends Component {
    constructor() {

        super({});

    }

    template() {

        return this.html = /* html */ `
            <a href="home" class="uk-navbar-item uk-logo">
                <img src="images/jrpgcollection.png" width="180" />
            </a>
        `;
    }
}