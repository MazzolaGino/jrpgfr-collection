import Call from './Call.js';
import Config from './Config.js';
import Endpoint from './Endpoints.js';
import Notif  from './Notif.js';
import Spinner from './Spinner.js';

export default class GameCard {

    constructor(element, parent) {
        this.element = element;
        this.handleAddToCollection = this.handleAddToCollection.bind(this);
        this.call = new Call(Config.getRemoteUrl());
        this.prt = parent; 
    }

    getCallElts(id) {
        console.log(id);
        for(var idx in this.prt.elts) {
            if(id == this.prt.elts[idx]['id']) {
                return this.prt.elts[idx];
            }
        }
    }

    handleAddToCollection(event) {
        const el = $(event.target).parent();
        const val = el.attr('data-value');
        const sp = new Spinner('spinner');
        const notif = new Notif();

        sp.show('Ajout du jeu à ta collection...');

        this.call.post(Endpoint.addToCollection(this.getCallElts(val)), (response) => {

            if(response.success === true) {
                notif.success('Le jeu a été ajouté à ta collection ! On continue ?');
            }

            sp.hide();
        },
        (error) => {
            if(error === 403) {
                notif.error('Le jeu est déjà dans ta collection');
                
            }

            this.removeSpinner('spinner');
            
        });

    }

    load() {
        const addToCollectionBtn = document.getElementById('add-to-collection-' + this.element.id);
        addToCollectionBtn.addEventListener('click', this.handleAddToCollection);
    }

    displaySpinner(id, msg) {
        document.getElementById(id).innerHTML = '<span class="spinner" uk-spinner>Ajout en cours ...</span>';
      }
    
      removeSpinner(id) {
        document.getElementById(id).innerHTML = '';
      }

    toSearch(phrase) {
        const mots = phrase.replace(/'/g, '').replace(/:/g, '').split(' ');
        const motsNonVides = mots.filter(mot => mot.trim() !== '');
        const troisPremiersMots = motsNonVides.slice(0, 3);
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
        if (!this.isValidDate(date)) {
            return 'Date inconnue';
        }
        return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    render() {
        
        let cover = this.element.cover_url ? 'https:' + this.element.cover_url : this.element.cover ? this.element.cover.url : 'images/empty90x90.jpg';

        let companies = '';
        if (this.element.involved_companies) {
            companies = this.element.involved_companies.map(company => `<span class="uk-label">${company.company_name ? company.company_name : company.company ? company.company.name : ''}</span>`).join(' ');
        }

        let supports = '';
        if (this.element.platforms) {
            supports = this.element.platforms.map(platform => `<span class="uk-label uk-label-success">${platform.name ? platform.name : platform.platform_name ? platform.platform_name : ''}</span>`).join(' ');
        }

        return /*html*/`
        <div class="uk-card uk-card-default">
            <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-auto">
                <img class="uk-border-square" width="90" height="90" src="${cover}" alt="${this.element.name}">
                </div>
                <div class="uk-width-expand">
                <h6 style="font-weight: bold" class="uk-card-title uk-margin-remove-bottom">${this.element.name}</h6>
                
                </div>
            </div>
            </div>
            <div class="uk-card-body">
            <h5>Date de sortie initiale : <time datetime="2016-04-01T19:00">${this.getDate(this.element.first_release_date)}</time></h5>
            <h5>Éditeur(s) / Développeur(s)</h5>
            <p>${companies}</p>
            <h5>Support(s)</h5>
            <p>${supports}</p>
            </div>
            <div class="uk-card-footer">
                <div class="uk-align-right">
                    <a uk-tooltip="title: Ajouter à la collection; pos: top-left" style="margin-right: 20px; color:rgb(255, 0, 242)" id="add-to-collection-${this.element.id}" data-value='${this.element.id}'>
                    <i class="fa-solid fa-plus"></i>
                    </a>
                    <a uk-tooltip="title: Ajouter à la liste d'envie; pos: top-left" style="margin-right: 20px; color:rgb(255, 0, 242)" id="add-to-wishlist-${this.element.id}" data-value="${this.element.id}">
                    <i class="fa-regular fa-heart"></i> 
                    </a>
                    <a href="https://jrpgfr.net/?s=${this.toSearch(this.element.name)}" uk-tooltip="title: Voir les informations sur le site de jrpgfr; pos: top-left" style="margin-right: 20px; color:rgb(255, 0, 242)" id="view-jrpgfr-${this.element.id}" data-value="${this.element.id}">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
    }
}