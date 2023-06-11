class Save {

  constructor() {
    if (Save.instance) {
      return Save.instance;
    }

    Save.instance = this;
    this.cookieExpiryDays = -1; // Durée de validité des cookies en jours
  }

  // Méthode pour enregistrer une valeur dans un cookie
  set(key, value) {

    const cookieValue = encodeURIComponent(value) + '; path=/';
    document.cookie = key + '=' + cookieValue;
  }

  // Méthode pour récupérer la valeur d'un cookie
  get(key) {
    const name = key + '=';
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }

      if (cookie.indexOf(name) === 0) {
        const cookieValue = decodeURIComponent(cookie.substring(name.length));
        return cookieValue;
      }
    }

    return null;
  }

  // Méthode pour supprimer un cookie
  delete(key) {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  // Méthode pour exporter les données des cookies au format JSON
  exportToJSON() {
    const cookies = document.cookie.split(';');
    const data = {};

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }

      const [key, value] = cookie.split('=');
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(value);
      data[decodedKey] = decodedValue;
    }

    return JSON.stringify(data);
  }

  // Méthode pour importer les données des cookies depuis un JSON
  importFromJSON(jsonData) {
    const data = JSON.parse(jsonData);

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(value);
        this.set(encodedKey, encodedValue);
      }
    }
  }
}

// Singleton instance
const saveInstance = new Save();
Object.freeze(saveInstance);

export default saveInstance;