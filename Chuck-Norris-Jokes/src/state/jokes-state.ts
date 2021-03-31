import { HttpClient } from "@aurelia/fetch-client";
import { IJoke } from "../domain/IJoke";
import { IJokesInfo } from "../domain/IJokesInfo";
import { JokesService } from '../services/jokes-service';

export class JokesState {
    public jokesInfo: Promise<IJokesInfo[]>;
    private jokesService: JokesService

    constructor() {
        this.jokesService = new JokesService(new HttpClient);
    }

    async InitializeJokesData(): Promise<void> {
        this.jokesInfo = this.jokesService.getAllJokeCategories()
            .then(categories => {
                let jokesInfo: IJokesInfo[] = []
                for (let index = 0; index < 3; index++) {
                    const _category: string = categories[Math.floor(Math.random() * categories.length)];
                    let jokeInfo: IJokesInfo = {category: _category, jokes: []};
                    jokesInfo.push(jokeInfo);
                }
                return jokesInfo;
            })
            .then(jokesInfo => {
                for (let index = 0; index < 3; index++) {
                    this.getJokes([], jokesInfo[index].category, 5)
                        .then(jokes => {jokesInfo[index].jokes = jokes})
                }
                return jokesInfo;
            })
            .catch(error => []);
    }

    async getJokes(existJokes: IJoke[], category: string, jokesCount: number): Promise<IJoke[]> {
        let jokes: IJoke[] = existJokes;
        //console.log(jokes);
        for (let index = 0; index < jokesCount; index++) {
            this.jokesService.getJoke(category).then(joke => {
                let orgJoke = jokes.find(j => j.id === joke.id);
                if (orgJoke != undefined) {
                    orgJoke.count++;
                } else {
                    jokes.push(joke);
                    joke.index = jokes.length;
                    joke.count = 1;
                }
            });
        }
        //console.log(jokes);
        return jokes;
    }

    async addJokes(pageNum: number, jokesCount: number): Promise<void> {
        this.jokesInfo
            .then(data => {return this.getJokes(data[pageNum].jokes, data[pageNum].category, jokesCount);})
            .then(jokes => {this.jokesInfo[pageNum].jokes = jokes;});   

        //this.jokesInfo.push(jokesInfo)
        //console.log(this.jokesInfo);
    }

}