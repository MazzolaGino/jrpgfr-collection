export default class Notification {
    static notificationContainer = null;
  
    constructor(color, message) {
      this.color = color;
      this.message = message;
      this.notificationElement = null;
      this.timerId = null;
    }
  
    static getNotificationContainer() {
      if (!Notification.notificationContainer) {
        // Créer le conteneur des notifications s'il n'existe pas
        Notification.notificationContainer = document.createElement('div');
        Notification.notificationContainer.classList.add('notification-container');
        document.body.appendChild(Notification.notificationContainer);
      }
      return Notification.notificationContainer;
    }
  
    show() {
      // Créer l'élément de notification
      this.notificationElement = document.createElement('div');
      this.notificationElement.classList.add('notification');
      this.notificationElement.style.backgroundColor = this.color;
      this.notificationElement.textContent = this.message;
  
      // Ajouter la notification au conteneur
      const notificationContainer = Notification.getNotificationContainer();
      notificationContainer.appendChild(this.notificationElement);
  
      // Centrer la notification verticalement
      this.notificationElement.style.top = `${notificationContainer.childElementCount * 60}px`;
  
      // Ajouter un écouteur d'événement pour fermer la notification au clic
      this.notificationElement.addEventListener('click', () => {
        this.hide();
      });
  
      // Définir un minuteur pour masquer la notification après 4 secondes
      this.timerId = setTimeout(() => {
        this.hide();
      }, 4000);
    }
  
    hide() {
      // Masquer la notification
      if (this.notificationElement) {
        this.notificationElement.remove();
        this.notificationElement = null;
      }
  
      // Effacer le minuteur
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
  
      // Vérifier si toutes les notifications ont été masquées
      const notificationContainer = Notification.getNotificationContainer();
      if (notificationContainer.childElementCount === 0) {
        // Supprimer le conteneur des notifications s'il est vide
        notificationContainer.remove();
        Notification.notificationContainer = null;
      }
    }
  }
  