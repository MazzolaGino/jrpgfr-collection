export default class Spinner{
    constructor(id) {
        this.element = document.getElementById(id);
    }

    show(msg) {
        console.log(this.element);
        this.element.innerHTML = '<span class="spinner" uk-spinner>' + msg + '</span>';
    }

    hide() {
        this.element.innerHTML = '';
    }
}