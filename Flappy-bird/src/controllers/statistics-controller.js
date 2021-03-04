export default class StatisticsController {

    constructor(viewContainer) {
        this.viewContainer = viewContainer;
        this.isRunning = false;
    }

    run(){
        this.isRunning = true;
        this.viewContainer.innerHTML = 'stats';
        document.body.style.background = "#99cc00";
    }

    stop(){
        this.isRunning = false;
    }
    resizeUi(){
        if (this.isRunning){
            //console.log(window.innerWidth, window.innerHeight);
            // redraw
        }
    }
}