import { EventAggregator, IDisposable } from "aurelia";
import { AppState } from "./state/app-state";
import { JokesState } from "./state/jokes-state";
import { JokesService } from "./services/jokes-service";

export class MyApp {
  private subscriptions: IDisposable[] = [];


  constructor(
    private eventAggregator: EventAggregator,
    private appState: AppState,
    private jokesState: JokesState,
    private jokesService: JokesService
  ) {
    
  }

  async attached() {
    this.jokesState.InitializeJokesData(); 
  }

  //detached() {
  //  this.subscriptions.forEach(subscription => subscription.dispose());
  //  this.subscriptions = [];
  //}


}
