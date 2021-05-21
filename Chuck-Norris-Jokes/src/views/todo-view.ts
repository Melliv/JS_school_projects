import { ITodo } from "../domain/ITodo";
import { EventAggregator, IDisposable } from "aurelia";
import { AppState } from "../state/app-state";

export class TodoView {
  

  private placeholder = "More and more stuff!!!";

  private description = '';


  private subscriptions: IDisposable[] = [];

  constructor(
    private eventAggregator: EventAggregator,
    private appState: AppState
    ) {

    this.subscriptions.push(
      this.eventAggregator.subscribe('new-todo', (descr: string) => this.addNewTodo(descr))
    );

  }

  addNewTodo = (descr: string): void => {
    this.appState.addTodo({description: descr.trim(), done: false});
  }

  detached() {
    this.subscriptions.forEach(subscription => subscription.dispose());
    this.subscriptions = [];
  }

}
