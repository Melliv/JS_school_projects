import { IRouter } from "aurelia";
import { AppState } from "./state/app-state";
import { AppLogin } from './app-login';

export class MyApp {
    constructor(
        @IRouter private router: IRouter,
        private state: AppState) {
      }
    
}
