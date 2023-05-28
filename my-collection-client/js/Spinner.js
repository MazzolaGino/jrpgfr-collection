export default class Spinner{
    constructor(id) {
        this.element = document.getElementById(id);
    }

    show(msg) {
        this.element.innerHTML = '<span class="spinner" uk-spinner>' + msg + '</span>';
    }

    hide() {
        this.element.innerHTML = '';
    }
}