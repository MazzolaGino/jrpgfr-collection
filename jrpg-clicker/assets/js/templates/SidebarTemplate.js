export default class SidebarTemplate {


    constructor(){
        this.container = "blob-sidebar"
        this.name = 'blob-name';
        this.stats = 'blob-stats';
        this.flowers = 'blob-flowers';
        this.map = 'blob-map';
        this.bonus = 'blob-bonus';
    }


    render() {
        return /* html */ `
            <div class="uk-card-header">
                <span id="${this.name}">Blob</span>
            </div>
            <div class="uk-card-body">
                <ul class="uk-nav">
                    <li id="${this.stats}"></li>
                    <li id="${this.flowers}"></li>
                    <li id="${this.map}"></li>
                    <li id="${this.bonus}"></li>
                </ul>
            </div>
        `;
    }
}