export default class GameTemplate {
    constructor() {
        this.container = 'clicker-element';
        this.blob = 'blob-clicker';
        this.ennemy = 'blob-ennemy';
        this.blobBigCount = 'blob-big-count';
    }

    render() {
        return /* html */ `
            <div class="uk-card uk-card-default">
                <div class="uk-card-header">
                    <img class="icon" src="assets/img/icons/S_Water07.png"> <span id="${this.blobBigCount}"></span>
                </div>
                <div class="uk-card-body">
                    <p class="blob" id="${this.blob}"></p>
                </div>
            </div>
            
        `;
    }
}