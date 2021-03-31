import {GameBrain} from '../model/gamebrain';
import settings from '../model/settings';

export default class GameController {

    private viewContainer: Element;
    private model: GameBrain;
    private set: settings;
    private birdLocation: Array<number> = [];
    private isRunning: boolean = false;
    private timer: any = null;
    private rowHeight: number = 0;
    private colWidth: number = 0;

    constructor(viewContainer: Element, model: GameBrain) {
        this.viewContainer = viewContainer;
        this.model = model;
        this.set = model.getSettings();
    }

    run(): void {
        this.displayBoard();
        this.birdLocation = this.model.getBirdLocation();
        this.drawBird();
        this.animateGame();
    }
    
    startModel(): void {
        this.model.resetGame();
    }

    displayBoard(): void  {
        this.isRunning = true;
        this.viewContainer.innerHTML = '';
        this.viewContainer.append(this.getBoardHtml());
    }

    birdJump(): void  {
        this.model.birdJump();
    }

    stop(): void {
        this.isRunning = false;
        clearTimeout(this.timer);
    }

    animateGame(): void  {
        this.timer = setTimeout(() => { 
            this.shiftBoard();
            this.showScore();
            this.animateGame();
        } , this.set.RENDER_SPEED);     
    }

    shiftBoard(): void  {
        this.model.shiftBoard();
        this.removeFirstCol();
        
        let col = this.getCol(this.model.getGameBoardLastCol());
        this.viewContainer.firstElementChild!.append(col);
        
        if (this.model.birdCrash()) {
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

    shiftBird(): void  {
        this.eraseBird();
        this.drawBird();
    }

    eraseBird(): void  {
        let col = this.viewContainer.firstElementChild!.childNodes;
        for (let colInd = this.birdLocation[0] - 1; colInd < this.birdLocation[1] - 1; colInd++) {
            for (let rowInd = this.birdLocation[2]; rowInd < this.birdLocation[3]; rowInd++) {
                let elem: HTMLElement = <HTMLElement>col[colInd].childNodes[rowInd];
                elem.style.backgroundColor = this.getCellColor(this.set.BLUE);
            }
        }
    }

    drawBird(): void  {
        this.birdLocation = this.model.getBirdLocation();
        let xCounter = 0;
        let col = this.viewContainer.firstElementChild!.childNodes;
        for (let colInd = this.birdLocation[0]; colInd < this.birdLocation[1]; colInd++) {
            let yCounter = 0;
            for (let rowInd = this.birdLocation[2]; rowInd < this.birdLocation[3]; rowInd++) {
                let elem: HTMLElement = <HTMLElement>col[colInd].childNodes[rowInd];
                elem.style.backgroundColor = this.getCellColor(this.model.getBirdCell(xCounter, yCounter));
                yCounter++;
            }
            xCounter++;
        }
    }

    showScore(): void  {
        document.getElementById("scoreElem")!.textContent = this.model.getScore().toString();
    }

    removeFirstCol(): void  {
        this.viewContainer.firstElementChild!.firstElementChild!.remove();
    }

    getBoardHtml(): Element  {
        let content = document.createElement('div');
        content.id = "gameboard";
        this.calculateBlockSize();

        this.model.getGameBoard().forEach((colData: Array<number>) => {
            content.append(this.getCol(colData));
        });

        return content;
    }

    calculateBlockSize(): void  {
        this.rowHeight = (window.innerHeight - document.getElementById("control")!.clientHeight - 3) / this.model.getRowCount();
        this.colWidth = window.innerWidth / this.model.getColCount();
    }

    getCol(colData: Array<number>): Element {
        let colElem = document.createElement('div');

        colElem.style.minWidth = this.colWidth + 'px';
        colElem.style.maxWidth = this.colWidth + 'px';
        colElem.style.display = 'inline-block';

        colData.forEach(rowData => {
            colElem.append(this.getCell(rowData));
        });

        return colElem;
    }

    getCell(rowData: number): Element {
        let rowElem = document.createElement('div');
        rowElem.style.backgroundColor = this.getCellColor(rowData);
        rowElem.style.minWidth = this.colWidth + 'px';
        rowElem.style.minHeight = this.rowHeight + 'px';

        return rowElem;
    }

    getCellColor(rowData: number): string {
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

    resizeUi(): void {
        if (this.isRunning){
            this.displayBoard();
        }
    }
}