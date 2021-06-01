import { HttpClient } from "aurelia";
import { IRouter } from "aurelia-direct-router";

import { IdentityService } from "../../services/identity-service";
import { AppState } from "../../state/app-state";
import { LoginErrors } from "../../domain/errors/LoginErrors";

export class IdentityLogin {
    errors: LoginErrors = new LoginErrors();

    private email: string = "teacher@teacher.ee";
    private password: string = "Foo.bar1";

    constructor(
        @IRouter private router: IRouter,
        private state: AppState,
        protected httpClient: HttpClient) {

    }

    async loginClicked(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (!this.handleValidation()) {
            return;
        }

        const response = await IdentityService.Login('/Account/Login', { email: this.email, password: this.password });

        if (!response.ok) {
            this.errors.generalError.message = response.messages ? response.messages : response.statusCode.toString();
        } else {
            this.state.logIn(response.data);
            await this.router.load('home');
        }
    }

    handleValidation(): boolean {
        let formIsValid = true;
        
        this.errors = new LoginErrors();

        if (!this.email) {
            this.errors.email.message = "Empty email!";
            formIsValid = false;
        }

        if (!this.password) {
            this.errors.password.message = "Empty password!";
            formIsValid = false;
        }

        return formIsValid;
    }

}
