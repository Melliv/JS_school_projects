import mainView from './views/mainview.js';
import controlView from './views/controlview.js';
import gameView from './views/gameview.js';

import GameBrain from './model/gamebrain.js';
import GameController from './controllers/game-controller.js';
import StatisticsController from './controllers/statistics-controller.js';

let game_view = gameView();
let gameController = new GameController(game_view);
let statisticsController = new StatisticsController(game_view);

let view = mainView();
document.body.append(view);
let ctrl_view = controlView(gameControlClick);
view.append(ctrl_view);
view.append(game_view);

function gameControlClick(e) {
    switch (e.target.id) {
        case 'game':
            let brain = new GameBrain();
            gameController.stop();
            statisticsController.stop();
            gameController.run(brain);
            break;
        case 'statistics':
            gameController.stop();
            statisticsController.run();
            break;

        default:
            break;
    }
}

statisticsController.run();


window.addEventListener('resize', () => {
    gameController.resizeUi();
    statisticsController.resizeUi();
});