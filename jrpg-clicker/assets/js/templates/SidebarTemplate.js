export default class SidebarTemplate {


    constructor(){
        this.container = "blob-sidebar"
        this.name = 'blob-name';
        this.flowersCount = 'blob-flowers-count'
        this.stats = 'blob-stats';
        this.flowers = 'blob-flowers';
        this.map = 'blob-map';
        this.bonus = 'blob-bonus';
    }


    render() {
        return /* html */ `
       
            <h3 id="${this.name}">Blob <span id="${this.flowersCount}"></span></h3>
                <ul class="menu-list">
                    <li id="${this.stats}"></li>
                    <li id="${this.flowers}"></li>
                    <li id="${this.map}"></li>
                    <li id="${this.bonus}"></li>
                </ul>
       
      
        `;
    }
}