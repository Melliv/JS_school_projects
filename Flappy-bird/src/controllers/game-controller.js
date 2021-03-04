export default class GameController {

    constructor(viewContainer) {
        this.viewContainer = viewContainer;
        this.rowHeight;
        this.colWidth;
    }

    getBirdLocation() {
        return this.model.getBirdLocation();
    }

    run(brain) {
        this.model = brain;
        this.isRunning = true;
        // draw the initial game board, start the game
        this.viewContainer.innerHTML = '';
        //console.log(this);

        this.viewContainer.append(this.getBoardHtml());
        
        this.animateGame();
    }


    stop(){
        this.isRunning = false;
        clearTimeout(this.timer);
    }

    animateGame() {
        this.timer = setTimeout(() => { 
            this.shiftBoard();
            this.animateGame();
        } , 30);     
    }

    shiftBoard() {
        //this.resizeUi();
        this.model.shiftBoard();
        this.removeFirstCol();
        let col = this.getCol(this.model.getGameBoardLastCol());
        //console.log(col);
        this.viewContainer.firstElementChild.append(col);
        this.shiftBird();

        
    }

    shiftBird() {
        let col = this.viewContainer.firstElementChild.childNodes;
        let cell;
        const BIRD_LOCATION = this.getBirdLocation();
        for (let colInd = BIRD_LOCATION[0] - 1; colInd < BIRD_LOCATION[1] - 1; colInd++) {
            for (let rowInd = BIRD_LOCATION[2]; rowInd < BIRD_LOCATION[3]; rowInd++) {
                col[colInd].childNodes[rowInd].style.backgroundColor = this.getCellColor(this.model.getSky());
            }
        }
        //console.log(this.X_START);
        //console.log(this.X_END);
        for (let colInd = BIRD_LOCATION[0]; colInd < BIRD_LOCATION[1]; colInd++) {
            col = this.viewContainer.firstElementChild.childNodes[colInd].childNodes;
            for (let rowInd = BIRD_LOCATION[2]; rowInd < BIRD_LOCATION[3]; rowInd++) {
                cell = this.model.getGameBoard()[colInd][rowInd];
                col[rowInd].style.backgroundColor = this.getCellColor(cell);
            }
        }
    }

    removeFirstCol() {
        this.viewContainer
            .firstElementChild
            .firstElementChild
            .remove();
    }

    getCol(colData, colIndex) {
        let colElem = document.createElement('div');
        //colElem.id = `id-col-${colIndex}`

        colElem.style.minWidth = this.colWidth + 'px';
        colElem.style.maxWidth = this.colWidth + 'px';
        colElem.style.display = 'inline-block';
        let rowIndex = 0;

        colData.forEach(rowData => {
            let rowElem = this.getCell(rowData, colIndex, rowIndex);
            colElem.append(rowElem);

        });

        return colElem;
    }

    getCell(rowData, colIndex, rowIndex) {
        let rowElem = document.createElement('div');
        //rowElem.id = `id-col-${colIndex}-row-${rowIndex}`

        rowElem.style.backgroundColor = this.getCellColor(rowData);
        rowElem.style.minWidth = this.colWidth + 'px';
        rowElem.style.minHeight = this.rowHeight + 'px';

        return rowElem;
    }

    getCellColor(rowData) {
        let color = '#000'
        if (rowData === this.model.getSky()) {
            color = '#0099ff';
        } else if (rowData === this.model.getObstacle()) {
            color = '#006600';
        } else if (rowData === this.model.getBirdCell()) {
            color = '#ffff00';
        }
        return color;
    }

    resizeUi(){
        if (this.isRunning){
            this.viewContainer.innerHTML = '';
            this.viewContainer.append(this.getBoardHtml(this.model));
        }
    }

    getBoardHtml() {
        let content = document.createElement('div');
        content.id = "gameboard";
        this.calculateBlockSize();

        let colIndex = 0;
        this.model.getGameBoard().forEach(colData => {
            let colElem = this.getCol(colData, colIndex);
            content.append(colElem);
            colIndex++;
        });

        return content;
    }

    calculateBlockSize() {
        this.rowHeight = (window.innerHeight- document.getElementById("control").clientHeight) / this.model.rowCount;
        this.colWidth = (window.innerWidth - 17) / this.model.colCount;
    }
}