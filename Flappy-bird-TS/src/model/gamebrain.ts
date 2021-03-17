import bird from './bird.ts';
import settings from './settings.ts';

export class GameScore {

    name: string;
    score: number;

    constructor(name: string, score: number) {
        this.name = name;
        this.score = score;
    }
}

export class GameBrain {

    private set: settings;
    private rowCount: number;
    private colCount: number;
    private scoreBoard: Array<GameScore> = [];

    private bird: bird = null!;
    private step: number = 0;
    private obsWidthCou: number = 0;
    private shiftCou: number = 0;
    private score: number = 0;
    private obstacleHolder: Array<number> = [];
    private board: Array<Array<number>> = [];

    constructor(rowCount: number = 0, colCount: number = 0) {
        this.set = new settings();
        this.rowCount = (rowCount === 0) ? this.set.ROW_COUNT : rowCount;
        this.colCount = (colCount === 0) ? this.set.COL_COUNT : colCount;

        this.intializeBoard();
    }

    intializeBoard(): void {
        this.bird = new bird(this.rowCount, this.colCount, this.set);
        for (let index = 0; index < this.colCount; index++) {
            this.board.push(this.createClearCol());
        }
    }

    resetGame(): void {
        this.step = 0;
        this.obsWidthCou = 0;
        this.shiftCou = 0;
        this.score = 0;
        this.obstacleHolder = [];
        this.board = [];

        this.intializeBoard();
    }

    createClearCol(): Array<number> {
        let res = [];
        for (let index = 0; index < this.rowCount; index++) {
            res.push(this.set.BLUE);
        }
        return res;
    }

    createObstacleCol(): Array<number> {
        let res = [];
        let gate = this.randomizeGate();

        for (let index = 0; index < this.rowCount; index++) {
            if (gate[0] <= index && index <= gate[1]) { // TODO switch if and else
                res.push(this.set.BLUE);
            } else {
                res.push(this.set.GREEN);
            }
        }
        return res;
    }

    randomizeGate(): Array<number> {
        const GATE_SIZE_HEIGHT = this.rowCount * this.set.GATE_SIZE;
        let gateStartPoint = Math.floor(Math.random() * (this.rowCount - GATE_SIZE_HEIGHT - 2));
        return [gateStartPoint, gateStartPoint + GATE_SIZE_HEIGHT];
    }

    insertScore(name: string): void {
        this.scoreBoard.push(new GameScore(name, this.score));
    }

    shiftBoard(): void {
        this.bird.moveBird();
        this.board.shift();
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

    calculateScore(): void {
        this.shiftCou++;
        if (this.score === 0 && this.shiftCou > this.colCount * (1-this.set.BIRD_START_POINT_X )
                            || this.score > 0 && this.shiftCou > this.set.OBSTACLE_STEP + this.set.OBSTACLE_WIDTH) {
            this.shiftCou = 0;
            this.score++;
        }
    }

    birdCrash(): boolean {
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

    birdJump(): void {
        this.bird.jump();
    }

    getRowCount(): number {return this.rowCount;}
    getColCount(): number {return this.colCount;}
    getSettings(): settings {return this.set;}
    getBirdCell(x: number, y: number): number {return this.bird.getBirdCell(x, y);}
    getBirdLocation(): Array<number> {return this.bird.getLocation();}
    getGameBoard(): Array<Array<number>> {return this.board;}
    getGameBoardLastCol(): Array<number> {return this.board[this.board.length - 1];}
    getScore(): number {return this.score;}
    getScoreBoard(): Array<GameScore> {return this.scoreBoard;}
}