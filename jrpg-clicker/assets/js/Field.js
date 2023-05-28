export default class Field {

    constructor(name, value, type = 'input', html = 'input', options = [], classes = '', id = '', eventHandler = (event) => { }) {
        this.actualType = type;
        this.value = value;
        this.name = name;
        this.html = html;
        this.options = options;
        this.classes = classes;
        this.id = id;
        this.element = null;
    }

    buildHandler() {
        return (event) => {
            this.value = event.target.value;
        }
    }

    setValue(value) {
        if(this.isFormElement()) {
            this.element.value = value;
        }
        else{
            this.element.innerHTML = value;
        }
    }

    create() {
        const element = document.createElement(this.html);

        element.name = this.name;
        element.className = this.classes;
        element.id = this.id;

        if (this.isFormElement()) {
            if (this.html === 'input') {
                element.setAttribute('type', this.actualType);
            } else if (this.html === 'select') {
                this.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.label;
                    element.appendChild(optionElement);
                });
            }

            element.value = this.value;
        } else {
            element.innerHTML = this.value;
        }



        return element;
    }

    isFormElement() {
        return ['input', 'select', 'textarea'].includes(this.html);
    }

    getEventType() {
        if (this.html === 'input' || this.html === 'textarea' || this.html === 'a') {
            if (this.actualType === 'checkbox' || this.actualType === 'radio') {
                return 'change';
            } else if (this.actualType === 'button' || this.actualType === 'submit' || this.actualType === 'a') {
                return 'click';
            } else {
                return 'input';
            }
        } else if (this.html === 'select') {
            return 'change';
        }

        return null;
    }

    attach(id, insert = false) {
        const parentElement = document.getElementById(id);
        if (parentElement) {
            let el = this.create();

            if (insert === true) {
                parentElement.innerHTML = el.outerHTML;
            } else {
                parentElement.appendChild(el);
            }

            this.element = el;

        } else {
            console.error(`Parent element with ID "${id}" not found.`);
        }
    }

    action(callback) {

        const eventType = this.getEventType();

        console.log(eventType);
        
        this.element.addEventListener(eventType, (event) => {
            callback(this.value);
        });
    }

    load(id) {
        console.log(id);
        this.attach(id);
    }

    htmlToElement(html) {
        var template = document.createElement("template");
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    }
}