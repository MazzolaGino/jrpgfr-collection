class Timer {
  constructor(duration, elementId) {
    this.duration = duration;
    this.elementId = elementId;
    
    this.startTimeKey = this.elementId + '-startTime';
    this.endTimeKey = this.elementId + '-startTime';
    this.startTime = parseInt(localStorage.getItem(this.startTimeKey));
    this.endTime = parseInt(localStorage.getItem(this.endTimeKey));
  }

  
  load() {
    this.element = document.getElementById(this.elementId);

    this.tick();
    this.interval = setInterval(() => this.tick(), 1000);
  }

  inProgress() {

    const currentTime = new Date().getTime();

    if (currentTime <= this.endTime) {
      return true;
    }

    return false;

  }

  start() {
    
    if (!this.startTime || !this.endTime) {
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + this.duration;
      localStorage.setItem(this.startTimeKey, this.startTime);
      localStorage.setItem(this.endTimeKey, this.endTime);
    }
    
  }

  stop() {
    clearInterval(this.interval);
    localStorage.removeItem(this.startTimeKey);
    localStorage.removeItem(this.endTimeKey);
  }

  tick() {
    const currentTime = new Date().getTime();

    if (currentTime <= this.endTime) {
      const remainingTime = this.endTime - currentTime;
      const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);

      this.element.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      this.stop();
      this.element.textContent = '00:00';
      // Faites quelque chose lorsque le timer est terminé
    }
  }
}

export default Timer;