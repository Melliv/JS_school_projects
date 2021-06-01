import { bindable, HttpClient, IRouter } from "aurelia";
import { AppState } from "../state/app-state";

export class Sidebar {

    constructor(
        @IRouter private router: IRouter,
        protected httpClient: HttpClient, 
        private appState: AppState) {
    }

}
