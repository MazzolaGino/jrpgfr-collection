export default class Base {

    constructor(id, data) {
        this.data = data;
        this.id = id;
    }

    set(key, value) {
        this[key] = value;
        this.display();
        return this;
    }

    get(key) {
        return this[key];
    }

    render(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }
}