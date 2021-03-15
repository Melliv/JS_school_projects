import mainView from './views/mainview.js';
import controlView from './views/controlview.js';
import gameView from './views/gameview.js';

import GameBrain from './model/gamebrain.js';
import GameController from './controllers/game-controller.js';
import StatisticsController from './controllers/statistics-controller.js';


let brain = new GameBrain();
let game_view = gameView();
let gameController = new GameController(game_view, brain);
let statisticsController = new StatisticsController(game_view, brain);

let view = mainView();
document.body.append(view);
let ctrl_view = controlView(gameControlClick);
view.append(ctrl_view);
view.append(game_view);

function gameControlClick(e) {
    this.blur();
    if (e.target.id === 'game') {
        statisticsController.stop();
        gameController.stop();
        gameController.startModel();
        gameController.run();
    } else if (e.target.id === 'statistics') {
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