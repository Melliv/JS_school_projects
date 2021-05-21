import { HttpClient } from "aurelia";
import { AppState } from "../../state/app-state";

export class HomeIndex {

    constructor(protected httpClient: HttpClient, private state: AppState){
    }
}
