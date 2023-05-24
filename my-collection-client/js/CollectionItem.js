import Call from './Call.js';
import Config from './Config.js';

export default class CollectionItem {

    constructor(element, parent) {
        this.element = element;
        this.call = new Call(Config.getRemoteUrl());
        this.prt = parent; 
    }

    getCallElts(id) {
        for(var idx in this.prt.elts) {
            if(id == this.prt.elts[idx]['id']) {
                return this.prt.elts[idx];
            }
        }
    }

    handleGameSheet(event) {
        document.getElementById(('collection-form-' + this.element.id))
            .classList.toggle('uk-hidden');
        
    }

    load(callback) {
        const addToCollectionBtn = document.getElementById('game-sheet-' + this.element.id);
        addToCollectionBtn.addEventListener('click', this.handleGameSheet.bind(this));

        if(callback){
            callback();
        }
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
        return /*html*/`
        <li id="collection-item-${this.element.id}">
            <div style="cursor:pointer" class="uk-flex uk-flex-wrap uk-flex-wrap-around f-item" id="game-sheet-${this.element.id}" data-value="${this.element.id}">
                <div class="uk-margin-left uk-width-1-4"><img width="90" height="90" src="${cover}" alt="${this.element.name}"></div>
                <h4 class="uk-margin-left uk-width-1-2">${this.element.name}</h4>
            </div>
            <hr>
            <div class="uk-hidden" id="collection-form-${this.element.id}"></div>

        </li>

    `;


    }
}