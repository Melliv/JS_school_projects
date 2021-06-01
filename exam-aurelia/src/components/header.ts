import { bindable, HttpClient } from "aurelia";
import { AppState } from "../state/app-state";
import { PageLoader } from "../types/PageLoader";
import { IRouter } from "aurelia-direct-router"

export class Header {

    @bindable
    value: PageLoader;

    constructor(
        @IRouter private router: IRouter,
        protected httpClient: HttpClient, 
        private appState: AppState) {
    }

    async logOut() {
        this.appState.logOut();
        await this.router.load("/Login");
    }


}
