import { HttpClient } from "aurelia";
import { AppState } from "./state/app-state";

export class AppLogin {

    constructor(
        protected httpClient: HttpClient,
        private state: AppState) {

      }
    
      attached() {
        console.log("header3");
        console.log(this.state);
      }
    
}
