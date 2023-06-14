import Save from "../tools/Save.js";

class Clicker {
    constructor() {
        this.golds = parseInt(Save.get('golds')) || 0;
        this.saphyres = parseInt(Save.get('saphyres')) || 0;
        this.rubis = parseInt(Save.get('rubis')) || 0;
        this.vortex = parseInt(Save.get('vortex')) || 0;

        if (typeof Clicker.instance === 'object') {
            return Clicker.instance;
        }
        Clicker.instance = this;

        return this;
    }

    static getInstance() {
        if (!Clicker.instance) {
            Clicker.instance = new Clicker();
        }
        return Clicker.instance;
    }

    click() {

        this.golds++;
        console.log('Gold:', this.golds);
        this.checkConversion();
        Save.set('golds', this.golds);

        const harvest = new CustomEvent('harvest', {
            detail: {
                g: this.golds,
                r: this.rubis,
                s: this.saphyres,
                v: this.vortex
            }
        });
        document.dispatchEvent(harvest);

    }

    canBuy(price) {
        const convertedPrice = this.convertToGold(price);
    
        for (const currency in convertedPrice) {
            if (this[currency] < convertedPrice[currency]) {
                return false;
            }
        }
    
        return true;
    }
    
    buy(price) {
        const convertedPrice = this.convertToGold(price);
    
        if (this.canBuy(convertedPrice)) {
            for (const currency in convertedPrice) {
                this[currency] -= convertedPrice[currency];
            }
    
            this.convertFromGold();
    
            // Mise à jour des valeurs sauvegardées
            Save.set('golds', this.golds);
            Save.set('rubis', this.rubis);
            Save.set('saphyres', this.saphyres);
            Save.set('vortex', this.vortex);
    
            return true; // Achat réussi
        }
    
        return false; // Impossible d'effectuer l'achat
    }
    
    convertToGold(amounts) {
        const golds = amounts.gold || 0;
        const rubis = (amounts.ruby || 0) * 1000;
        const saphyres = (amounts.saphyre || 0) * 1000 * 1000;
        const vortex = (amounts.vortex || 0) * 1000 * 1000 * 1000;
    
        return { gold: golds, ruby: rubis, saphyre: saphyres, vortex: vortex };
    }
    
    convertFromGold() {
        const convertedRubis = Math.floor(this.golds / 1000);
        this.rubis += convertedRubis;
        this.golds %= 1000;
    
        const convertedSaphyres = Math.floor(this.rubis / 1000);
        this.saphyres += convertedSaphyres;
        this.rubis %= 1000;
    
        const convertedVortex = Math.floor(this.saphyres / 1000);
        this.vortex += convertedVortex;
        this.saphyres %= 1000;
    }
    

    convertToSaphyres() {
        if (this.golds >= 1000) {
            const convertedSaphyres = Math.floor(this.golds / 1000);
            this.golds -= convertedSaphyres * 1000;
            this.saphyres += convertedSaphyres;
            console.log('Converted to Saphyres:', convertedSaphyres);

            Save.set('saphyres', this.saphyres);
        }
    }

    convertToRubis() {
        if (this.saphyres >= 1000) {
            const convertedRubis = Math.floor(this.saphyres / 1000);
            this.saphyres -= convertedRubis * 1000;
            this.rubis += convertedRubis;
            console.log('Converted to Rubis:', convertedRubis);
            Save.set('rubis', this.rubis);
            Save.set('saphyres', this.saphyres);

        }
    }

    convertToVortex() {
        if (this.rubis >= 1000) {
            const convertedVortex = Math.floor(this.rubis / 1000);
            this.rubis -= convertedVortex * 1000;
            this.vortex += convertedVortex;
            console.log('Converted to Vortex:', convertedVortex);

            Save.set('rubis', this.rubis);
            Save.set('vortex', this.vortex);
        }
    }

    checkConversion() {
        if (this.golds >= 1000) {
            this.convertToSaphyres();
        }
        if (this.saphyres >= 1000) {
            this.convertToRubis();
        }
        if (this.rubis >= 1000) {
            this.convertToVortex();
        }
    }
}

// Export du singleton Clicker
const clickerInstance = Clicker.getInstance();

export default clickerInstance;