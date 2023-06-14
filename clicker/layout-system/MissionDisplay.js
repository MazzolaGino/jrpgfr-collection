import Mission from "../game-system/Mission.js";

export default class MissionDisplay {

    static display(mission) {

        console.log(mission);

        if (!(mission instanceof Mission)) {
            return '';
        }

        let template = /* html */ `
        <div id="${mission.id}" class="mission">

            <div class="mission-description">
            <div class="mission-title"><span class="name">${mission.name}</span> lv. <span class="level">${mission.level}</span>
                <div class="mission-action">
                <button><i class="fa-solid fa-play"></i></button>
                <button><i class="fa-solid fa-pause"></i></button>
                <button><i class="fa-solid fa-stop"></i></button>
                <button><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <div class="mission-spaceship"></div>
            <div class="mission-content">
                <div class="mission-duration">
                <span class="duration-title">Duration</span><span class="duration-time">05:00</span>
                </div>
                <div class="animated-progress progress-blue">
                <span id= "${mission.id}-bar" data-progress="45"></span>
                </div>
            </div>
            </div>

      </div>`;

        mission.start();

        document.getElementById('missions').append(MissionDisplay.toHtml(template));

        let missionInterval = setInterval(() => {
            
            let bar = document.getElementById(mission.id + '-bar');


            bar.setAttribute('data-progress', mission.getPercentage());
            bar.style.width = mission.getPercentage() + '%';

            console.log(mission.getPercentage());

            if(mission.getPercentage() >=100) {
                mission.stop();
                clearInterval(missionInterval);
            }

        }, 1000);

    }

    static toHtml(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }
}