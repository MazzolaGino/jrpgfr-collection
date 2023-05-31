export default class FieldComponent {
    constructor(id, template) {
        this.id = id;
        this.template = template;
        this.app = document.getElementById(id);
        this.app.innerHTML = this.template.render();
    }

    erase (id) {
        if(id) {
            document.getElementById(id).remove();
        }else{
            this.app.remove();
        }
    }
}