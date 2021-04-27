import { IJokesInfo } from "../domain/IJokesInfo";
import { JokesState } from "../state/jokes-state";


export class Jokes2View {

    private pageNum: number = 2;

    private jokesInfo: IJokesInfo;

    constructor(private jokesState: JokesState){        
    }

    
    async attached() {
        this.jokesState.addJokes(this.pageNum - 1, 5)
            .then(() => {return this.jokesState.jokesInfo})
            .then(data => {this.jokesInfo = data[this.pageNum - 1]});
    }

}