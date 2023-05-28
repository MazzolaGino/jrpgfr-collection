  
  export default class ClickCounter {

    constructor(elementId, save) {

      this.clicks = save.clicks;
      this.elementId = elementId;
      this.bonus = save.bonus;
      this.click_rate = save.click_rate;

      this.addBonuses();
      
    }

    getFormatedClickRate() {
      return this.formatNumber(this.click_rate);
    }

    addBonuses(){
        this.bonus.forEach((item) => {
          setInterval(() => {
            this.clicks += item;
            this.updateClicks();
          }, 1000);
        })
    }
  
    increment() {
      
      this.clicks+= this.click_rate;
      
      this.updateClicks();
    }
  
    updateClicks() {

      const clickCountElement = document.getElementById(this.elementId);
      const blobBigCount = document.getElementById('blob-big-count');
      
      if (clickCountElement) {
        clickCountElement.textContent = this.formatNumber(this.clicks);
        blobBigCount.textContent = this.formatNumber(this.clicks);

      }

    }
  
    formatNumber(number) {

      const abbreviations = ['', 'K', 'M', 'B', 'T'];
  
      let index = 0;

      while (number >= 1000) {
        number /= 1000;
        index++;
      }
  
      return number.toFixed(1) + abbreviations[index];
    }
  }