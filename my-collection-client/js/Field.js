export default class Field {

    constructor(name, value, type = 'input', html = 'input', options = [], classes = '', id = '', eventHandler = (event) => { }) {
        this.actualType = type;
        this.value = value;
        this.name = name;
        this.html = html;
        this.options = options;
        this.classes = classes;
        this.id = id;
        this.eventHandler = this.buildHandler().bind(this);
    }

    buildHandler() {
        return (event) => {
            this.value = event.target.value;
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

    attach(id) {
        const parentElement = document.getElementById(id);
        if (parentElement) {
            let el = this.create();
            parentElement.appendChild(el);

            const eventType = this.getEventType();

            if (eventType && this.eventHandler) {
                el.addEventListener(eventType, event => this.eventHandler(event));
            }

        } else {
            console.error(`Parent element with ID "${id}" not found.`);
        }
    }

    load(id) {
        this.attach(id);
    }
}