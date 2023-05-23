export default class FieldGroup {
    #fields;
    #elementType;
    
    constructor(fields, elementType) {
        this.#fields = fields;
        this.#elementType = elementType;
    }
    
    create() {
        const container = document.createElement(this.#elementType);
        
        this.#fields.forEach(field => {
            const fieldElement = field.create();
            container.appendChild(fieldElement);
        });
        
        return container;
    }
}