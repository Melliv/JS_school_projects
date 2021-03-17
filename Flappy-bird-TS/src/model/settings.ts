
export default class Settings {
    
    ROW_COUNT: number = 100;
    COL_COUNT: number = 100;
    RENDER_SPEED: number = 50; // millisecond

    OBSTACLE_STEP: number = 60;
    OBSTACLE_WIDTH: number = 8;
    GATE_SIZE: number = 0.4; // 1 is full height
    
    JUMP_REPETITION: number = 10;
    JUMP_WIDTH: number = 3;
    BIRD_WIDTH: number = 0.08;
    BIRD_HEIGHT: number = 0.08;
    BIRD_START_POINT_X: number = 0.25;
    BIRD_START_POINT_Y: number = 0.5;
    
    GREEN: number = -1; // obstacle
    BLUE: number = 0;   // sky
    YELLOW: number = 1; // 
    ORANGE: number = 2; // 
    RED: number = 3;    // 
    WHITE: number = 4;  // 
    BLACK: number = 5;  // 

    BIRD_8x8: Array<Array<number>> = [
        [0, 0, 1, 1, 2, 2, 0, 0],
        [0, 1, 1, 2, 2, 2, 2, 0],
        [1, 1, 1, 2, 2, 2, 2, 1],
        [1, 1, 1, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 4, 4, 1, 3, 3, 1, 1],
        [0, 5, 5, 1, 3, 3, 1, 0],
        [0, 0, 0, 0, 3, 3, 0, 0]];
    BIRD_16x12: Array<Array<number>> = [
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