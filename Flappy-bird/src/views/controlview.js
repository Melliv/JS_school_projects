export default function mainView(eventHandler) {
    let control = document.createElement('div');
    control.style.textAlign = "center";
    control.style.background = "#006666";
    control.id = 'control';

    let statisticsButton = document.createElement('button');
    statisticsButton.id = 'statistics';
    statisticsButton.innerText='Statistics';

    let gameButton = document.createElement('button');
    gameButton.id = 'game';
    gameButton.innerText='Game';
    gameButton.style.marginLeft = "3%";
    gameButton.style.marginRight = "3%";

    let scoreTextElem = document.createElement("span");
    scoreTextElem.textContent = "Score:";

    let scoreElem = document.createElement("span");
    scoreElem.id = "scoreElem";
    scoreElem.style.fontWeight = "bold";

    control.append(statisticsButton);
    control.append(gameButton);
    control.append(scoreTextElem);
    control.append(scoreElem);

    statisticsButton.addEventListener('click', eventHandler);
    gameButton.addEventListener('click', eventHandler);
    
    return control;
}