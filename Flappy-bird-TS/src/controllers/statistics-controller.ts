import {GameBrain, GameScore} from '../model/gamebrain';

export default class StatisticsController {

    viewContainer: Element;
    model: GameBrain;
    isRunning: boolean = false;

    constructor(viewContainer: Element, model : GameBrain) {
        this.viewContainer = viewContainer;
        this.model = model
    }

    run(){
        this.isRunning = true;
        this.viewContainer.innerHTML = '';
        this.makeScoreTable();
    }

    makeScoreTable() {
        let tableElem = document.createElement("table");
        let tableHeader1Elem = document.createElement("th");
        let tableHeader2Elem = document.createElement("th");
        tableHeader1Elem.textContent = "score";
        tableHeader2Elem.textContent = "name";
        tableHeader1Elem.style.width = "100px"
        tableHeader2Elem.style.width = "100px"

        tableElem.append(tableHeader1Elem);
        tableElem.append(tableHeader2Elem);
        this.model.getScoreBoard().forEach((row: GameScore) => {
            let tableRowElem = document.createElement("tr");
            let tableScoreElem = document.createElement("td");
            let tableNameElem = document.createElement("td");
            tableScoreElem.textContent = row.score.toString();
            tableNameElem.textContent = row.name;

            tableRowElem.append(tableScoreElem);
            tableRowElem.append(tableNameElem);
            tableElem.append(tableRowElem);
        });

        tableElem.style.margin = "auto";
        tableElem.style.fontSize = "200%";
        this.viewContainer.append(tableElem);
    }

    stop(){
        this.isRunning = false;
    }

    resizeUi(){
        if (this.isRunning){
            //console.log(window.innerWidth, window.innerHeight);
            //redraw
        }
    }
}