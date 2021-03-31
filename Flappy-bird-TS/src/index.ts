import mainView from './views/mainview';
import controlView from './views/controlview';
import gameView from './views/gameview';

import {GameBrain} from './model/gamebrain';
import GameController from './controllers/game-controller';
import StatisticsController from './controllers/statistics-controller';


let brain = new GameBrain();
let game_view = gameView();
let gameController = new GameController(game_view, brain);
let statisticsController = new StatisticsController(game_view, brain);

let view = mainView();
document.body.append(view);
let ctrl_view = controlView(gameControlClick);
view.append(ctrl_view);
view.append(game_view);

function gameControlClick(elem : HTMLButtonElement) {
    elem.blur();
    if (elem.id === 'game') {
        statisticsController.stop();
        gameController.stop();
        gameController.startModel();
        gameController.run();
    } else if (elem.id === 'statistics') {
        gameController.stop();
        statisticsController.run();
    }
}

window.addEventListener('resize', () => {
    gameController.resizeUi();
});

window.addEventListener('keyup', () => {
    gameController.birdJump();
});

statisticsController.run();