export default class Bird {

    constructor(boardHeight = 5, boardWidth = 5) {
        this.height = Math.floor(boardHeight / 12);
        this.width = Math.floor(boardWidth / 10);
        this.BIRD_START_LOCATION_X = Math.floor(boardWidth * 0.25);
        this.BIRD_END_LOCATION_X = this.BIRD_START_LOCATION_X + this.width;
        this.BIRD_START_LOCATION_Y = Math.floor(boardHeight * 0.5);
        this.BIRD_END_LOCATION_Y = this.BIRD_START_LOCATION_Y + this.height;

        this.birdCells = [];

        this.makeBird();
    }

    makeBird() {
        for (let index = 0; index < this.width; index++) {
            let row = [];
            for (let index = 0; index < this.height; index++) {
                row.push(2);
            }
            this.birdCells.push(row);
        }
    }

    moveBird() {

    }

    getBirdWidth() {return this.width;}
    getBirdHeight() {return this.height;}
    getLocation() {
        const LOCATION = [this.BIRD_START_LOCATION_X, this.BIRD_END_LOCATION_X, this.BIRD_START_LOCATION_Y, this.BIRD_END_LOCATION_Y];
        //console.log(LOCATION);
        return LOCATION;
    }
    getBirdCells() {return this.birdCells;}
    getBirdCell(x, y) {return this.birdCells[x][y];}
}