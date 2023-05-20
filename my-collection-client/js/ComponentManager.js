export default class ComponentManager {
  constructor(domain, baseEndpoint, CookieManager) {
    this.domain = domain;
    this.baseEndpoint = baseEndpoint;
    this.components = [];
    this.currentIndex = -1;
    this.cookieManager = CookieManager;
  }

  addComponent(component, endpoint, params) {
    this.components.push({ component, endpoint, params });
  }

  render(endpoint, params) {
    const componentIndex = this.components.findIndex(
      item => item.endpoint === endpoint
    );

    if (componentIndex !== -1) {
      this.currentIndex = componentIndex;

      const { component } = this.components[this.currentIndex];
      params = (params)? params : [];
      
      const currentComponent = new component(...params);
      let notyf = new Notyf();

      currentComponent.setUikit(UIkit);
      currentComponent.setNotif(notyf);
      currentComponent.setCm(this);

      currentComponent.render();
    }
  }

  navigateTo(endpoint) {

    const url = `${this.domain}/app/${endpoint}`;
    window.location.href = url;
  }

  isAuthorized(endpoint)
  {
    if(endpoint !== 'login') {
      return (this.cookieManager.getCookie('token') !== null);
    }

    return true;
    
  }

  handleURLChange() {
    const url = window.location.href;
    const endpoint = url.substring(url.lastIndexOf('/') + 1);

    if (endpoint !== this.baseEndpoint && this.isAuthorized(endpoint)) {
      this.render(endpoint, null);
    }else {
      this.render('login', null);
    }
  }

  load(callback) {

    document.addEventListener('DOMContentLoaded', () => {

      if(callback) {
        callback();
      }
    
      this.handleURLChange();
  });
  }
}
