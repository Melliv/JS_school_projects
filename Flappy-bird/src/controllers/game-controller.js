export default class GameController {

    constructor(viewContainer, brain) {
        this.viewContainer = viewContainer;
        this.model = brain;
        this.set = this.model.getSettings();
    }

    run() {
        this.displayBoard();
        this.birdLocation = this.model.getBirdLocation();
        this.drawBird();
        this.animateGame();
    }
    
    startModel() {
        this.model.intializeBoard();
    }

    displayBoard() {
        this.isRunning = true;
        this.viewContainer.innerHTML = '';
        this.viewContainer.append(this.getBoardHtml());
    }

    birdJump() {
        this.model.birdJump();
    }

    stop(){
        this.isRunning = false;
        clearTimeout(this.timer);
    }

    animateGame() {
        this.timer = setTimeout(() => { 
            this.shiftBoard();
            this.showScore();
            this.animateGame();
        } , this.set.RENDER_SPEED);     
    }

    shiftBoard() {
        this.model.shiftBoard();
        this.removeFirstCol();
        
        let col = this.getCol(this.model.getGameBoardLastCol());
        this.viewContainer.firstElementChild.append(col);
        
        if (this.model.birdCrash()) {
            this.stop();
            let name = prompt("Insert your name");
            if (name != null) {
                this.model.insertScore(name);
            }
            this.startModel();
            this.displayBoard();
        } else {
            this.shiftBird();
        }
    }

    shiftBird() {
        this.eraseBird();
        this.drawBird();
    }

    eraseBird() {
        let col = this.viewContainer.firstElementChild.childNodes;
        for (let colInd = this.birdLocation[0] - 1; colInd < this.birdLocation[1] - 1; colInd++) {
            for (let rowInd = this.birdLocation[2]; rowInd < this.birdLocation[3]; rowInd++) {
                col[colInd].childNodes[rowInd].style.backgroundColor = this.getCellColor(this.set.BLUE);
            }
        }
    }

    drawBird() {
        this.birdLocation = this.model.getBirdLocation();
        let xCounter = 0;
        for (let colInd = this.birdLocation[0]; colInd < this.birdLocation[1]; colInd++) {
            let col = this.viewContainer.firstElementChild.childNodes[colInd].childNodes;
            let yCounter = 0;
            for (let rowInd = this.birdLocation[2]; rowInd < this.birdLocation[3]; rowInd++) {
                col[rowInd].style.backgroundColor = this.getCellColor(this.model.getBirdCell(xCounter, yCounter));
                yCounter++;
            }
            xCounter++;
        }
    }

    showScore() {
        document.getElementById("scoreElem").textContent = this.model.getScore();
    }

    removeFirstCol() {
        this.viewContainer.firstElementChild.firstElementChild.remove();
    }

    getBoardHtml() {
        let content = document.createElement('div');
        content.id = "gameboard";
        this.calculateBlockSize();

        this.model.getGameBoard().forEach(colData => {
            content.append(this.getCol(colData));
        });

        return content;
    }

    calculateBlockSize() {
        this.rowHeight = (window.innerHeight- document.getElementById("control").clientHeight) / this.model.rowCount;
        this.colWidth = (window.innerWidth - 17) / this.model.colCount;
    }

    getCol(colData) {
        let colElem = document.createElement('div');

        colElem.style.minWidth = this.colWidth + 'px';
        colElem.style.maxWidth = this.colWidth + 'px';
        colElem.style.display = 'inline-block';

        colData.forEach(rowData => {
            colElem.append(this.getCell(rowData));
        });

        return colElem;
    }

    getCell(rowData) {
        let rowElem = document.createElement('div');
        rowElem.style.backgroundColor = this.getCellColor(rowData);
        rowElem.style.minWidth = this.colWidth + 'px';
        rowElem.style.minHeight = this.rowHeight + 'px';

        return rowElem;
    }

    getCellColor(rowData) {
        switch(rowData) {
            case this.set.BLUE:
                return '#0099ff';
            case this.set.GREEN:
                return '#006600';
            case this.set.YELLOW:
                return '#ffff00';
            case this.set.ORANGE:
                return '#f5b342';
            case this.set.RED:
                return '#f54242';
            case this.set.WHITE:
                return '#ffffff';
            case this.set.BLACK:
                return '#000000';
            default:
                return "#111111"
        };
    }

    resizeUi(){
        if (this.isRunning){
            this.displayBoard();
        }
    }
}