export default class CustomComponent {
  constructor({ elements, container, data }) {
    this.isListItem = null;
    this.elements = elements;
    this.container = container;
    this.data = {};

    this.initializeData(data);
  }

  initializeData(data) {
    for (const element of this.elements) {
      const { name } = element;

      if (data && data[name]) {
        this.data[name] = data[name];
      } else {
        this.data[name] = null;
      }
    }
  }

  initializeElements() {
    for (const element of this.elements) {
      const { name, event } = element;

      const targetElement = document.querySelector(`[data-name="${name}"]`);

      if (targetElement) {
        if (event) {
          targetElement.addEventListener(event, this.handleEvent.bind(this));
        }

        this.updateElement(name, this.data[name]);
      } else {
        console.warn(`Element with data-name "${name}" not found.`);
      }
    }
  }

  handleEvent(event) {
    const { target } = event;
    const name = target.dataset.name;
    this.data[name] = this.getElementValue(target);

    return {
      name: name,
      value: this.data[name],
    };
  }

  updateElement(name, value) {
    const targetElement = document.querySelector(`[data-name="${name}"]`);

    if (targetElement && !targetElement.hasAttribute("data-notset")) {
      this.setElementValue(targetElement, value);
    }
  }

  getElement(name) {
    return document.querySelector(`[data-name="${name}"]`);
  }

  getElementValue(element) {
    const tagName = element.tagName.toLowerCase();
    const type = element.type ? element.type.toLowerCase() : "";

    if (tagName === "input" && (type === "checkbox" || type === "radio")) {
      return element.checked;
    } else if (tagName === "select" || tagName === "textarea") {
      return element.value;
    } else if (tagName === "input" && type === "date") {
      return element.valueAsDate;
    } else {
      return element.innerHTML;
    }
  }

  setElementValue(element, value) {
    const tagName = element.tagName.toLowerCase();
    const type = element.type ? element.type.toLowerCase() : "";

    if (tagName === "input" && (type === "checkbox" || type === "radio")) {
      element.checked = value;
    } else if (tagName === "select" || tagName === "textarea") {
      element.value = value;
    } else if (tagName === "input" && type === "date") {
      element.valueAsDate = value;
    } else {
      element.innerHTML = value;
    }
  }

  render() {
    const containerElement = document.querySelector(`[data-name="${this.container}"]`);

    if (containerElement) {
      containerElement.innerHTML = this.template();
      this.initializeElements();
    } else {
      console.error(`Container element with data-name="${this.container}" not found.`);
    }
  }

  template() {
    return "";
  }

  htmlToElement(html) {
    var template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  }
}
