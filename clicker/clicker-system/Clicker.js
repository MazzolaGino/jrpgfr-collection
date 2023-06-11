import Save from "../tools/Save.js";

class Clicker {
    constructor() {
        this.golds = Save.get('golds') || 0;
        this.saphyres = 0;
        this.rubis = 0;
        this.vortex = 0;
    
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
      }

    convertToSaphyres() {
        if (this.golds >= 1000) {
            const convertedSaphyres = Math.floor(this.golds / 1000);
            this.golds -= convertedSaphyres * 1000;
            this.saphyres += convertedSaphyres;
            console.log('Converted to Saphyres:', convertedSaphyres);
        }
    }

    convertToRubis() {
        if (this.saphyres >= 1000) {
            const convertedRubis = Math.floor(this.saphyres / 1000);
            this.saphyres -= convertedRubis * 1000;
            this.rubis += convertedRubis;
            console.log('Converted to Rubis:', convertedRubis);
        }
    }

    convertToVortex() {
        if (this.rubis >= 1000) {
            const convertedVortex = Math.floor(this.rubis / 1000);
            this.rubis -= convertedVortex * 1000;
            this.vortex += convertedVortex;
            console.log('Converted to Vortex:', convertedVortex);
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