export default class CollectionFormTemplate {

    constructor(element){
        this.element = element;
        this.rating = 'f-rating-' + this.element.id;
        this.hours = 'f-hours-' + this.element.id;
        this.status = 'f-status-' + this.element.id;
        this.review = 'f-review-' + this.element.id;
        this.submit = 'f-submit-' + this.element.id;
    }


    render() {
        return /* html */ `
        <fieldset class="uk-fieldset">

            <div class="uk-margin">
                <label class="uk-form-label" for="rating">Mon Évaluation</label>
                <div class="uk-form-controls" id="${this.rating}"></div>
            </div>
            
            <div class="uk-margin">
                <label class="uk-form-label" for="hours">Mon Temps de Jeu</label>
                <div class="uk-form-controls" id="${this.hours}"></div>
            </div>
            
            <div class="uk-margin">
                <label class="uk-form-label" for="status">Mon Statut</label>
                <div class="uk-form-controls" id="${this.status}"></div>
            </div>
            
            <div class="uk-margin">
                <label class="uk-form-label" for="review">Ma Critique</label>
                <div class="uk-form-controls uk-form-controls-text" id="${this.review}"></div>
            </div>
            <hr />
            <div class="uk-margin">
                <div class="uk-form-controls uk-form-controls-button" id="${this.submit}"</div>
            </div>
        </fieldset>
      
        `;
    }
}