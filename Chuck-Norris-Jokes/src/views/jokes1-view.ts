import { IJokesInfo } from "../domain/IJokesInfo";
import { JokesState } from "../state/jokes-state";


export class Jokes1View {

    private pageNum: number = 1;

    private jokesInfo: IJokesInfo;

    constructor(private jokesState: JokesState){
    }

    
    async attached() {
        this.jokesState.addJokes(this.pageNum - 1, 1)
            .then(() => {return this.jokesState.jokesInfo})
            .then(data => {
                this.jokesInfo = data[this.pageNum - 1]});
    }

}