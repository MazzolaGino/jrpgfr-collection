export default class GameCard {

    constructor(element) {
        this.element = element;
    }

    handleAddToCollection(event) {
        let el = $(event.target).parent();
        console.log(el.attr('data-value'));
    }

    load() {
        document.getElementById('add-to-collection-' + this.element.id)
        .addEventListener('click', this.handleAddToCollection);
    }

    toSearch(phrase) {

        let mots = phrase.replace(/'/g, '');
        mots = phrase.replace(/:/g, '').split(' ');

        // Filtrer les mots vides
        const motsNonVides = mots.filter(mot => mot.trim() !== '');

        // Garder uniquement les trois premiers mots
        const troisPremiersMots = motsNonVides.slice(0, 3);

        // Concaténer les trois premiers mots avec le signe "+"
        const resultat = troisPremiersMots.join('+');

        return resultat;

    }

    isValidDate(date) {
        return date instanceof Date && !isNaN(date);
    }

    getDate(timestamp) {

        if (timestamp === 'undefined') {
            return 'Non déterminée';
        }

        const date = new Date(timestamp * 1000);

        if(! this.isValidDate(date)) 
        {
            return 'Date inconnue';
        }

        return date.getDay() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }


    render() {

        let cover = '', companies = '', supports = '';

        if (this.element.cover) {
            cover = 'https:' + this.element.cover.url;
        } else {
            cover = 'images/empty90x90.jpg';
        }

        if (this.element.involved_companies) {
            this.element.involved_companies.forEach(company => {
                companies += /* html */`<span class="uk-label"> ${company.company.name}</span> `;
            });
        }

        if (this.element.platforms) {
            this.element.platforms.forEach(platform => {
                supports += /* html */`<span class="uk-label uk-label-success"> ${platform.name}</span> `;
            });
        }
        return /* html */`
            <div class="uk-card uk-card-default uk-width-1-1@m">
                <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-auto">
                            <img class="uk-border-square" width="90" height="90" src="${cover}" alt="${this.element.name}">
                        </div>
                        <div class="uk-width-expand">
                            <h6 style="font-weight: bold" class="uk-card-title uk-margin-remove-bottom">${this.element.name}</h6>
                    

                            <p class="uk-text-meta">
                                
                            <a  uk-tooltip="title: Ajouter à la collection; pos: top-left" style="font-size: 20px; color:rgb(255, 0, 242)" id="add-to-collection-${this.element.id}" data-value="${this.element.id}">
                                <i class="fa-solid fa-plus"></i>
                            </a>

                           <a uk-tooltip="title: Ajouter à la liste d'envie; pos: top-left" style="font-size: 20px; color:rgb(255, 0, 242)" id="add-to-wishlist-${this.element.id}" data-value="${this.element.id}">
                           <i class="fa-regular fa-heart"></i>
                            </a>
                            <a href="https://jrpgfr.net/?s=${this.toSearch(this.element.name)}" uk-tooltip="title: Voir les informations sur le site de jrpgfr; pos: top-left" 
                            style="font-size: 20px; color:rgb(255, 0, 242)" id="add-to-collection-${this.element.id}" data-value="${this.element.id}">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </a>
                            </p>
                            
                        </div>
                    </div>
                </div>
                <div class="uk-card-body">
                    <h5>Date de sortie initialle : <time datetime="2016-04-01T19:00">${this.getDate(this.element.first_release_date)}</time></h5>
                    <h5>Éditeur(s) / Développeur(s)</h5> <p>${companies}</p>
                    <h5>Support(s)</h5> <p>${supports}</p>
                </div>
                <div class="uk-card-footer">
                    
                </div>
            </div>

        `;


    }
}