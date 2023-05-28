export default class GameTemplate {
    constructor() {
        this.container = 'clicker-element';
        this.blob = 'blob-clicker';
        this.blobBigCount = 'blob-big-count';
        this.blobAllies = 'blob-allies';
    }

    render() {
        return /* html */ `
        
        <h1>Blob Adventure</h1>
        <h2 id="${this.blobBigCount}"></h2>
        <p class="blob" id="${this.blob}"></p>
        <p class="allies" id="${this.blobAllies}"></p>
        
        `;
    }
}