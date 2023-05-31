export default class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
        return this;
    }

    // Méthode pour se désabonner d'un observateur
    unsubscribe(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    // Méthode pour notifier tous les observateurs d'un événement
    notify(event) {
        this.observers.forEach(observer => {
            observer.update(event);
        });
    }
}