import { HttpClient } from "aurelia";
import { IRouter } from "aurelia-direct-router";

import { AccountService } from "../../services/account-service";
import { AppState } from "../../state/app-state";
import { IJwt } from "../../types/IJwt";

export class IdentityLogin {
  //AccountService

    private service: AccountService =
        new AccountService("Account/login", this.httpClient);

    private email: string = "admin@admin.ee";
    private password: string = "Foo.bar1";

    constructor(
        @IRouter private router: IRouter,
        private state: AppState,
        protected httpClient: HttpClient) {

    }

    async loginClicked(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        let response = await this.service.login(this.email, this.password);

        if (response.statusCode == 200 && response.data ) {
            this.state.token = (response.data as IJwt).token;
            this.state.firstname = (response.data as IJwt).firstname;
            this.state.lastname = (response.data as IJwt).lastname;
            this.state.role = (response.data as IJwt).role;

            await this.router.load('home');
        }
        

    }

}
