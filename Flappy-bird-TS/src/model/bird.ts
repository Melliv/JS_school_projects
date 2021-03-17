import settings from './settings.ts';

export default class Bird {

    private set: settings;
    private width: number;
    private height: number;
    private jumpRep: number 

    private BIRD_START_LOCATION_X: number;
    private BIRD_END_LOCATION_X: number;
    private BIRD_START_LOCATION_Y: number;
    private BIRD_END_LOCATION_Y: number;

    private birdCells: Array<Array<number>> = [];
    private moveDown: boolean = true;

    constructor(boardHeight: number, boardWidth: number, settings: settings) {
        this.set = settings;
        this.width = Math.floor(boardWidth * this.set.BIRD_HEIGHT);
        this.height = Math.floor(boardHeight * this.set.BIRD_WIDTH);
        this.jumpRep = this.set.JUMP_REPETITION;
        //this.width = 16;
        //this.height = 12;

        this.BIRD_START_LOCATION_X = Math.floor(boardWidth * this.set.BIRD_START_POINT_X);
        this.BIRD_END_LOCATION_X = this.BIRD_START_LOCATION_X + this.width;
        this.BIRD_START_LOCATION_Y = Math.floor(boardHeight * this.set.BIRD_START_POINT_Y);
        this.BIRD_END_LOCATION_Y = this.BIRD_START_LOCATION_Y + this.height;

        this.makeBird();
    }

    makeBird(): void {
        if (this.width === 8 && this.height === 8) {
            this.birdCells = this.set.BIRD_8x8;
        } else if (this.width === 16 && this.height === 12) {
            this.birdCells = this.set.BIRD_16x12;
        } else {
            for (let index = 0; index < this.width; index++) {
                let row = [];
                for (let index = 0; index < this.height; index++) {
                    row.push(this.set.YELLOW);
                }
                this.birdCells.push(row);
            }
        }
    }

    moveBird(): void {
        if (this.moveDown) {
            this.BIRD_START_LOCATION_Y++;
            this.BIRD_END_LOCATION_Y++;
            //Alternative
            //this.BIRD_START_LOCATION_Y += this.set.JUMP_WIDTH;     
            //this.BIRD_END_LOCATION_Y += this.set.JUMP_WIDTH;
        } else {
            this.BIRD_START_LOCATION_Y -= this.set.JUMP_WIDTH;
            this.BIRD_END_LOCATION_Y -= this.set.JUMP_WIDTH; 
            this.jumpRep--;
            if (this.jumpRep === 0) {
                this.moveDown = true;
                this.jumpRep = this.set.JUMP_REPETITION;
            }
        }
    }

    jump(): void {
        this.moveDown = false;
    }

    getLocation(): Array<number> {return [this.BIRD_START_LOCATION_X, this.BIRD_END_LOCATION_X, this.BIRD_START_LOCATION_Y, this.BIRD_END_LOCATION_Y];}
    getBirdCell(x: number, y: number): number {return this.birdCells[x][y];}
}