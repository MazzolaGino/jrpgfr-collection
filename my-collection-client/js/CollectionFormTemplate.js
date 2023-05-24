export default class CollectionFormTemplate {

    // Définition des sélecteurs utiles au composant.
    // En définissant tous les selecteurs dans le template,
    // le composant devient totalement réutilisable

    constructor(element){
        this.element = element;
        this.rating = 'f-rating-' + this.element.id;
        this.hours = 'f-hours-' + this.element.id;
        this.status = 'f-status-' + this.element.id;
        this.review = 'f-review-' + this.element.id;
        this.submit = 'f-submit-' + this.element.id;
        this.delete = 'f-delete-' + this.element.id;
        this.parent = 'collection-item-' + this.element.id;
        this.form = 'collection-form-' + this.element.id;
    }


    render() {
        return /* html */ `
       

    
            <div class="uk-margin">
                <label class="uk-form-label" for="rating">Mon Évaluation</label>
                <div class="uk-form-controls">
                    <!-- Champ du formulaire pour l'évaluation -->
                    <div id="${this.rating}"></div>
                </div>
            </div>
    
            <div class="uk-margin">
                <label class="uk-form-label" for="hours">Mon Temps de Jeu</label>
                <div class="uk-form-controls">
                    <!-- Champ du formulaire pour le temps de jeu -->
                    <div id="${this.hours}"></div>
                </div>
            </div>
    
            <div class="uk-margin">
                <label class="uk-form-label" for="status">Mon Statut</label>
                <div class="uk-form-controls">
                    <!-- Champ du formulaire pour le statut -->
                    <div id="${this.status}"></div>
                </div>
            </div>
    
            <div class="uk-margin">
                <label class="uk-form-label" for="review">Ma Critique</label>
                <div class="uk-form-controls uk-form-controls-text">
                    <!-- Champ du formulaire pour la critique -->
                    <div id="${this.review}"></div>
                </div>
            </div>
    
            <hr />
    
            <div class="uk-margin uk-flex">
                <div class="uk-form-controls uk-form-controls-button uk-flex uk-float-right f-action-group">
                    <!-- Bouton de soumission du formulaire -->
                    <div class="uk-margin-right f-action" id="${this.submit}"></div>
                    <div class="uk-margin-right f-action" id="${this.delete}"></div>
                </div>
            </div>
    

    
      
        `;
    }
}