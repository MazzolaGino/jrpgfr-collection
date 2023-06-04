export default class Modal {

    constructor(modalId, title, body ) {
      this.title = title;
      this.body = body;
      this.id = modalId;
      this.modal = document.getElementById(this.id);
     
      
    }
  
    open() {
      document.getElementById('modal-header').innerHTML = `${this.title} <span class="close-modal"> X </span>`;
      document.getElementById('modal-body').innerHTML = this.body;

      this.openButtons = document.querySelectorAll(`[data-open-modal="${this.id}"]`);
      this.closeButton = this.modal.querySelector(".close-modal");
  
      this.openButtons.forEach((button) => {
        button.addEventListener("click", this.open.bind(this));
      });
  
      this.closeButton.addEventListener("click", this.close.bind(this));
      window.addEventListener("click", this.closeOutside.bind(this));

      this.modal.style.display = "block";


    }
  
    close() {
      this.modal.style.display = "none";
    }
  
    closeOutside(event) {
      if (event.target === this.modal) {
        this.close();
      }
    }
  }