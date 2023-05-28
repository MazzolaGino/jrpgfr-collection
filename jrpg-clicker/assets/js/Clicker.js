export default class Clicker {

    constructor() {
      const img = document.querySelector("*");
      img.ondragstart = () => false;
  
      const clickerElement = document.querySelector(".blob img");
      clickerElement.addEventListener("click", this.handleClick.bind(this));

      this.clickerCount = null;
    }

    setClickerCount(clickerCount) {
      this.clickerCount = clickerCount;
    }
  
    handleClick(event) {

      const x = event.clientX;
      const y = event.clientY;
  
      const plusOne = document.createElement("div");
      plusOne.classList.add("plus-one");
      plusOne.textContent = "+" + this.clickerCount.getFormatedClickRate();
      plusOne.style.left = `${x + 10}px`;
      plusOne.style.top = `${y + 10}px`;
  
      document.body.appendChild(plusOne);
  
      let distance = y;
      const animationInterval = setInterval(() => {
        distance -= 2;
        plusOne.style.top = `${distance}px`;
        if (distance < y - 50) {
          clearInterval(animationInterval);
          document.body.removeChild(plusOne);
        }
      }, 20);

      var blobImage = document.querySelector('.blob img');

      blobImage.addEventListener('click', function() {
        blobImage.classList.add('glow-effect');
    
        setTimeout(function() {
          blobImage.classList.remove('glow-effect');
        }, 500);
      });
    }

    
  }