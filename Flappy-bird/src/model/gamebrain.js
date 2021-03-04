import bird from './bird.js';

class GameScore {
    constructor() {
        this.name = '';
        this.score = 0;
    }
}

export const SKY_CELL = 0;
export const OBSTACLE_CELL = -1;
export const BIRD_CELL = 2;

export const OBSTACLE_STEP = 60
export const OBSTACLE_WIDTH = 10

export default class GameBrain {


    constructor(rowCount = 100, colCount = 100) {
        this.step = Math.floor(OBSTACLE_STEP / 2);
        this.obsWidthCou = 0;
        this.obstacleHolder = [];
        this.rowCount = rowCount;
        this.colCount = colCount;

        this.scoreBoard = []; // of GameScore
        this.board = [];
        this.bird = new bird(rowCount, colCount);

        this.intializeBoard();
    }

    createClearCol() {
        let res = [];
        for (let index = 0; index < this.rowCount; index++) {
            res.push(SKY_CELL);
        }
        return res;
    }

    createObstacleCol() {
        let res = [];
        let gate = this.randomizeGate();

        //console.log(gate[0]);
        for (let index = 0; index < this.rowCount; index++) {
            if (gate[0] <= index && index <= gate[1]) {
                res.push(SKY_CELL);
            } else {
                res.push(OBSTACLE_CELL);
            }
        }
        return res;
    }

    randomizeGate() {
        const GATE_SIZE = this.rowCount / 4;
        let gateStartPoint = Math.floor(Math.random() * (this.rowCount - GATE_SIZE - 2));
        return [gateStartPoint, gateStartPoint + GATE_SIZE];
    }

    intializeBoard() {
        for (let index = 0; index < this.colCount; index++) {
            this.board.push(this.createClearCol());
        }
        this.intializeBird();
    }

    intializeBird() {
        let birdCellX = 0;
        let birdCellY = 0;
        let birdLoc = this.getBirdLocation();
        //console.log(birdLoc);
        //console.log("xd");
        for (let x = birdLoc[0]; x < birdLoc[1]; x++) {
            for (let y = birdLoc[2]; y < birdLoc[3]; y++) {
                this.board[x][y] = this.bird.getBirdCell(birdCellX, birdCellY);
                //console.log(birdCellX);
                //console.log(this.bird.getBirdCell(birdCellX, birdCellY));
                birdCellY++;
            }
            birdCellX++;
            birdCellY = 0;
        }
    }

    shiftBoard() {
        this.shiftBird();
        //console.log(this.obstacleHolder);
        if (this.step === OBSTACLE_STEP) {
            this.obstacleHolder = this.createObstacleCol();
            this.board.push(this.obstacleHolder);
            this.obsWidthCou = 0;
            this.step = 0;
        } else if (this.step === 0 && this.obsWidthCou < OBSTACLE_WIDTH) {
            this.board.push(this.obstacleHolder);
            this.obsWidthCou++;
        } else {
            //console.log("test");
            this.board.push(this.createClearCol());
            this.step++;
        }
        
        this.intializeBird();
    }

    shiftBird() {
        const birdLoc = this.getBirdLocation();
        let x;
        let y;
        for (x = birdLoc[0]; x < birdLoc[1]; x++) {
            for (y = birdLoc[2]; y < birdLoc[3]; y++) {
                this.board[x][y] = SKY_CELL;
            }
        }
        this.bird.moveBird();
        this.board.shift();
        //console.log(birdLoc[0]);
        //console.log(birdLoc[1]);
        for (x = birdLoc[0]; x < birdLoc[1]; x++) {
            //console.log("elajas");
            for (y = birdLoc[2]; y < birdLoc[3]; y++) {
                this.board[x][y] = BIRD_CELL;
                //console.log("test");
            }
        }

    }

    getBirdLocation() {return this.bird.getLocation();}
    getGameBoard() {return this.board;}
    getGameBoardLastCol() {return this.board[this.board.length - 1];}
    getBird() {return this.bird;}

    getSky() {return SKY_CELL}
    getObstacle() {return OBSTACLE_CELL}
    getBirdCell() {return BIRD_CELL}
}