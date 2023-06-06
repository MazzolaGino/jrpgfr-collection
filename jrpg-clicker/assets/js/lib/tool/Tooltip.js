export default class Tooltip {
    constructor(cls, text) {
        
      this.element = document.querySelector('.' + cls);
      this.text = text;
      this.tooltipText = null;
  
      this.initialize();
    }
  
    initialize() {
      this.element.addEventListener('mouseenter', () => this.showTooltip());
      this.element.addEventListener('mouseleave', () => this.hideTooltip());
    }
  
    showTooltip() {
      this.tooltipText = document.createElement('span');
      this.tooltipText.classList.add('tooltip-text');
      this.tooltipText.innerText = this.text;
  
      document.body.appendChild(this.tooltipText);
      this.positionTooltip();
    }
  
    hideTooltip() {
      if (this.tooltipText) {
        document.body.removeChild(this.tooltipText);
        this.tooltipText = null;
      }
    }
  
    positionTooltip() {
      const elementRect = this.element.getBoundingClientRect();
      const tooltipRect = this.tooltipText.getBoundingClientRect();
  
      const top = elementRect.top - tooltipRect.height;
      const left = elementRect.left - tooltipRect.left - 10;
  
      this.tooltipText.style.top = `${top}px`;
      this.tooltipText.style.left = `${left}px`;

      this.tooltipText.style.visibility = 'visible';
    }
  }
  