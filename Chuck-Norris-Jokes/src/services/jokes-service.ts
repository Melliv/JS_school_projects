import { IJoke } from './../domain/IJoke';
import { ICategorie } from './../domain/ICategorie';
import { HttpClient, inject } from "aurelia";
import { Console } from 'node:console';

@inject()
export class JokesService {

    constructor(private httpClient: HttpClient) {

    }

    getJoke(categorie : string): Promise<IJoke> {
        return this.httpClient
            .get(`https://api.chucknorris.io/jokes/random?category=${categorie}`, { cache: "no-store" })
            .then(response => {return response.json();})
            .then(data => {return data;})
            .catch(error => "lol");
    }

    getAllJokeCategories(): Promise<string[]> {
        return this.httpClient
            .get("https://api.chucknorris.io/jokes/categories", { cache: "no-store" })
            .then(response => {return response.json();})
            .then(data => {return data;})
            .catch(error => []);
    }

}