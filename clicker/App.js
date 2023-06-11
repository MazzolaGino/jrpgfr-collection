import Mission from "./mission-system/Mission.js";
import MinionFactory from "./mission-system/mission-factory/MinionFactory.js"


window.onload = (event) => {

    $(".animated-progress span").each(function () {
        $(this).animate(
            {
                width: $(this).attr("data-progress") + "%",
            },
            1000
        );
        $(this).text($(this).attr("data-progress") + "%");
    });
    
    let minions = [
        MinionFactory.getRandomMinion(1),
        MinionFactory.getRandomMinion(2),
        MinionFactory.getRandomMinion(3),
        MinionFactory.getRandomMinion(3),
        MinionFactory.getRandomMinion(3),
        MinionFactory.getRandomMinion(3),
    ];

    minions.forEach((minion) => {

        var div = document.createElement('div');
        div.innerHTML = `<p><img src="${minion.image}"/></p>`;
        document.getElementById('minions').append(div.firstChild);
    });
};



