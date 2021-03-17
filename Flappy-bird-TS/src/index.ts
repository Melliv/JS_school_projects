import mainView from './views/mainview.ts';
import controlView from './views/controlview.ts';
import gameView from './views/gameview.ts';

import {GameBrain} from './model/gamebrain.ts';
import GameController from './controllers/game-controller.ts';
import StatisticsController from './controllers/statistics-controller.ts';


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