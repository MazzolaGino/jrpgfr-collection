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

      let cmt = new component(...params);

      if(cmt.hasOwnProperty('cm')) {
        cmt.cm = this;
      }

      cmt.render();
      

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
      (new Notyf()).success('Bienvenue sur JRPGFR Collection !');
      
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
