import Call from "./Call.js";
import CookieManager from "./CookieManager.js";
import Config from "./Config.js";

export default class Component {

  #events;

  constructor(elts, id = null) {

    this.id = Config.getRoot();

    if (id) {
      this.id = id;
    }

    this.html = '';
    this.call = new Call(Config.getRemoteUrl());
    this.cookies = CookieManager;

    this.#events = elts;
    this.keys = Object.keys(this.#events);

    this.#events = elts;
    this.html = this.template();
    this.cm = null;
    this.notif = null;
  }

  displaySpinner(id) {
    document.getElementById(id).innerHTML = '<span style="color:rgb(255, 0, 242)" uk-spinner>Nous cherchons pour toi ...</span>';
  }

  removeSpinner(id) {
    document.getElementById(id).innerHTML = '';
  }


  get(name) {

    if (this.keys.includes(name)) {
      return this.#events[name];
    }

  }

  getValue(name) {
    var elt = document.querySelector('[data-name="' + name + '"]');
    return elt.getAttribute('data-value');
  }

  set(name, value, refresh = true) {

    if (this.keys.includes(name)) {

      if (refresh) {
        this.#refresh(name, value);
      }

      this.#events[name] = value;
    }

  }

  setCm(cm) {
    this.cm = cm;
  }

  setNotif(notif) {
    this.notif = notif;
  }

  msgSuccess(message) {

    setTimeout(function () {
      this.notif.success(message);
    }, 500);

  }

  msgError(message) {

    setTimeout(function () {
      this.notif.error(message);
    }, 500);

  }

  navigate(cmt, params) {
    this.cm.navigateTo(cmt, params);
  }



  init(obj) {
    this.#events = obj;
  }

  template() { }

  renderHtml() {
    return this.html;
  }

  #refresh(name, value) {

    var elt = document.querySelector('[data-name="' + name + '"]');

    if (elt) {
      var tagName = elt.tagName.toLowerCase();

      switch (tagName) {
        case 'input':
          switch (elt.type) {
            case 'checkbox':
            case 'radio':
              elt.checked = value;
              break;
            case 'date':
              elt.valueAsDate = new Date(value);
              break;
            default:
              elt.value = value;
          }
          break;
        case 'textarea':
          elt.value = value;
          break;
        case 'select':
          for (var i = 0; i < elt.options.length; i++) {
            var option = elt.options[i];
            if (option.value === value) {
              option.selected = true;
            }
          }
          break;
        default:
          console.log(value);
          elt.innerHTML = value;
      }
    }
  }

 


  getElement()
  {
    return document.querySelector(`[data-name="${this.id}"]`);
  }

  render() {

    this.getElement().innerHTML = this.html;

    for (let evt in this.keys) {

      var elt = document.querySelector('[data-name="' + this.keys[evt] + '"]');
      
      if (elt) {
        if (elt.getAttribute('data-action') && elt.getAttribute('data-method')) {

          elt.addEventListener(

            elt.getAttribute('data-action'),
            this[elt.getAttribute('data-method')].bind(this)

          );
        }
      }
    };
  }
};