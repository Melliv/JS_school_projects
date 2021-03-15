import bird from './bird.js';
import settings from './settings.js';

class GameScore {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
}

export default class GameBrain {

    constructor(rowCount, colCount) {
        this.set = new settings();
        this.rowCount = rowCount ?? this.set.ROW_COUNT;
        this.colCount = colCount ?? this.set.COL_COUNT;
        this.scoreBoard = [];

        this.intializeBoard();
    }

    intializeBoard() {
        this.bird = new bird(this.rowCount, this.colCount, this.set);
        this.step = 0;
        this.obsWidthCou = 0;
        this.shiftCou = 0;
        this.score = 0;
        this.obstacleHolder = [];
        this.board = [];

        for (let index = 0; index < this.colCount; index++) {
            this.board.push(this.createClearCol());
        }
    }

    createClearCol() {
        let res = [];
        for (let index = 0; index < this.rowCount; index++) {
            res.push(this.set.BLUE);
        }
        return res;
    }

    createObstacleCol() {
        let res = [];
        let gate = this.randomizeGate();

        for (let index = 0; index < this.rowCount; index++) {
            if (gate[0] <= index && index <= gate[1]) {
                res.push(this.set.BLUE);
            } else {
                res.push(this.set.GREEN);
            }
        }
        return res;
    }

    randomizeGate() {
        const GATE_SIZE_HEIGHT = this.rowCount * this.set.GATE_SIZE;
        let gateStartPoint = Math.floor(Math.random() * (this.rowCount - GATE_SIZE_HEIGHT - 2));
        return [gateStartPoint, gateStartPoint + GATE_SIZE_HEIGHT];
    }

    insertScore(name) {
        this.scoreBoard.push(new GameScore(name, this.score));
    }

    shiftBoard() {
        this.shiftBird();
        this.calculateScore();
        if (this.step === 0) {
            this.obstacleHolder = this.createObstacleCol();
            this.board.push(this.obstacleHolder);
            this.obsWidthCou = 0;
            this.step = this.set.OBSTACLE_STEP;
        } else if (this.step === this.set.OBSTACLE_STEP && this.obsWidthCou < this.set.OBSTACLE_WIDTH) {
            this.board.push(this.obstacleHolder);
            this.obsWidthCou++;
        } else {
            this.board.push(this.createClearCol());
            this.step--;
        }
        
    }

    calculateScore() {
        this.shiftCou++;
        if (this.score === 0 && this.shiftCou > this.colCount * (1-this.set.BIRD_START_POINT_X )
                            || this.score > 0 && this.shiftCou > this.set.OBSTACLE_STEP + this.set.OBSTACLE_WIDTH) {
            this.shiftCou = 0;
            this.score++;
        }
    }

    shiftBird() {
        this.bird.moveBird();
        this.board.shift();
    }

    birdCrash() {
        const BIRD_LOCATION = this.getBirdLocation();
        for (let yCord = BIRD_LOCATION[2]; yCord < BIRD_LOCATION[3]; yCord++) {
            if (this.board[BIRD_LOCATION[1] - 1][yCord] === this.set.GREEN) {
                return true;
            }
        }
        for (let xCord = BIRD_LOCATION[0]; xCord < BIRD_LOCATION[1]; xCord++) {
            if (this.board[xCord][BIRD_LOCATION[2]] === this.set.GREEN || this.board[xCord][BIRD_LOCATION[3]] === this.set.GREEN) {
                return true;
            }
        }
        return (BIRD_LOCATION[2] <= 0 || BIRD_LOCATION[3] === this.colCount);
    }

    birdJump() {
        this.bird.jump();
    }

    getSettings() {return this.set;}
    getBirdCell(x, y) {return this.bird.getBirdCell(x, y);}
    getBirdLocation() {return this.bird.getLocation();}
    getGameBoard() {return this.board;}
    getGameBoardLastCol() {return this.board[this.board.length - 1];}
    getScore() {return this.score;}
    getScoreBoard() {return this.scoreBoard;}
}