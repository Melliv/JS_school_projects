
export default class Settings {
    
    constructor() {
        this.ROW_COUNT = 100;
        this.COL_COUNT = 100;
        this.RENDER_SPEED = 50; // millisecond

        this.OBSTACLE_STEP = 60;
        this.OBSTACLE_WIDTH = 8;
        this.GATE_SIZE = 0.5; // 1 is full height
        
        this.JUMP_REPETITION = 8;
        this.JUMP_WIDTH = 3;
        this.BIRD_WIDTH = 0.08;
        this.BIRD_HEIGHT = 0.08;
        this.BIRD_START_POINT_X = 0.25;
        this.BIRD_START_POINT_Y = 0.5;
        
        this.GREEN = -1; // obstacle
        this.BLUE = 0;   // sky
        this.YELLOW = 1; // 
        this.ORANGE = 2; // 
        this.RED = 3;    // 
        this.WHITE = 4;  // 
        this.BLACK = 5;  // 

        this.BIRD_8x8 = [
            [0, 0, 1, 1, 2, 2, 0, 0],
            [0, 1, 1, 2, 2, 2, 2, 0],
            [1, 1, 1, 2, 2, 2, 2, 1],
            [1, 1, 1, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 4, 4, 1, 3, 3, 1, 1],
            [0, 5, 5, 1, 3, 3, 1, 0],
            [0, 0, 0, 0, 3, 3, 0, 0]];
        this.BIRD_16x12 = [
            [0,0,0,0,5,5,5,0,0,0,0,0],
            [0,0,0,5,4,4,1,5,0,0,0,0],
            [0,0,0,5,4,4,4,1,5,5,0,0],
            [0,0,5,4,4,4,4,1,5,2,5,0],
            [0,5,4,5,4,4,4,1,5,2,5,0],
            [0,5,4,1,5,4,1,5,2,2,2,5],
            [5,4,1,1,1,5,5,1,2,2,2,5],
            [5,4,1,1,1,1,1,1,2,2,2,5],
            [5,4,5,5,5,1,1,1,5,2,2,5],
            [5,5,4,4,4,5,1,5,3,5,2,5],
            [5,4,4,4,4,4,5,3,5,3,5,0],
            [5,4,4,4,4,4,5,3,5,3,5,0],
            [0,5,4,5,5,4,5,3,5,3,5,0],
            [0,0,5,4,4,4,5,3,5,3,5,0],
            [0,0,0,5,5,5,5,3,5,3,5,0],
            [0,0,0,0,0,0,0,5,5,5,0,0]];
    }
}