export default class Bird {

    constructor(boardHeight, boardWidth, settings) {
        this.set = settings;
        this.width = Math.floor(boardWidth * this.set.BIRD_HEIGHT);
        this.height = Math.floor(boardHeight * this.set.BIRD_WIDTH);
        //this.width = 16;
        //this.height = 12;

        this.BIRD_START_LOCATION_X = Math.floor(boardWidth * this.set.BIRD_START_POINT_X);
        this.BIRD_END_LOCATION_X = this.BIRD_START_LOCATION_X + this.width;
        this.BIRD_START_LOCATION_Y = Math.floor(boardHeight * this.set.BIRD_START_POINT_Y);
        this.BIRD_END_LOCATION_Y = this.BIRD_START_LOCATION_Y + this.height;

        this.birdCells = [];
        this.jumpRep = this.set.JUMP_REPETITION;
        this.moveDown = true;

        this.makeBird();
    }

    makeBird() {
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

    moveBird() {
        if (this.moveDown) {
            this.BIRD_START_LOCATION_Y++;
            this.BIRD_END_LOCATION_Y++;
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

    jump() {
        this.moveDown = false;
    }

    getWidth() {return this.width;}
    getHeight() {return this.height;}
    getLocation() {return [this.BIRD_START_LOCATION_X, this.BIRD_END_LOCATION_X, this.BIRD_START_LOCATION_Y, this.BIRD_END_LOCATION_Y];}
    getBirdCell(x, y) {return this.birdCells[x][y];}
}