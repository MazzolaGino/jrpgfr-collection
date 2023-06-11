export default class MissionDisplay {
    constructor(mission, containerId) {
        this.mission = mission;
        this.container = document.getElementById(containerId);
        this.progressBar = null;
        this.timerLabel = null;
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.style.width = '0%';

        const progressBarText = document.createElement('span');
        progressBarText.classList.add('progress-bar-text');
        progressBarText.textContent = '0%';

        progressBar.appendChild(progressBarText);
        this.container.appendChild(progressBar);

        this.progressBar = progressBar;
    }

    createTimerLabel() {
        const timerLabel = document.createElement('div');
        timerLabel.classList.add('timer-label');
        timerLabel.textContent = '00:00';

        this.container.appendChild(timerLabel);

        this.timerLabel = timerLabel;
    }

    updateProgressBar(progress) {
        if (this.progressBar) {
            this.progressBar.style.width = `${progress}%`;
            this.progressBar.textContent = `${progress}%`;
        }
    }

    updateTimerLabel(time) {
        if (this.timerLabel) {
            const minutes = Math.floor(time / 60).toString().padStart(2, '0');
            const seconds = (time % 60).toString().padStart(2, '0');
            this.timerLabel.textContent = `${minutes}:${seconds}`;
        }
    }

    start() {
        console.log('start');

        if (!this.progressBar) {
            this.createProgressBar();
        }

        if (!this.timerLabel) {
            this.createTimerLabel();
        }

        this.updateProgressBar(0);
        this.updateTimerLabel(this.mission.level);

        const interval = 1000; // Interval d'une seconde
        let remainingTime = this.mission.level;

        const timer = setInterval(() => {
            remainingTime--;

            if (remainingTime <= 0) {
                clearInterval(timer);
            }

            const progress = ((this.mission.level - remainingTime) / this.mission.level) * 100;
            this.updateProgressBar(progress);
            this.updateTimerLabel(remainingTime);
        }, interval);
    }
}