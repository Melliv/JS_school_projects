import { HttpClient, IRouter } from "aurelia";
import { BaseService } from "./services/base-service";
import { AppState } from "./state/app-state";

export class AppHeader {

    constructor(
        @IRouter private router: IRouter,
        protected httpClient: HttpClient,
        private state: AppState) {

      }
    
      attached() {
        console.log("header2");
        console.log(this.state);
      }
    
      async logOut(){
        this.state.token = null;
        this.state.firstname = null;
        this.state.lastname = null;
    
        await this.router.load('/my-app');
      }
}
