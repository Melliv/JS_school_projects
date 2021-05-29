import { HttpClient } from "aurelia";
import { IRouter } from "aurelia-direct-router";

import { Register as RegisterDTO } from "../../domain/DTO/Register";
import { AppState } from "../../state/app-state";
import { IdentityService } from "../../services/identity-service";
import { RegisterErrors } from "../../domain/errors/RegisterErrors";

export class IdentityRegister {
    errors: RegisterErrors = new RegisterErrors();
    registerDTO: RegisterDTO = new RegisterDTO();
    confirmPassword: string = "";

    constructor(
        @IRouter private router: IRouter,
        private state: AppState,
        protected httpClient: HttpClient) {
    }

    async registerClicked(): Promise<void> {
         if (!this.handleValidation()) {
            return;
        }

        const response = await IdentityService.Register('/Account/Register', this.registerDTO);
        if (!response.ok && response.messages != null) {
            this.errors.generalError.message = response.messages
        } else {
            this.state.logIn(response.data);
            await this.router.load('home');
        }
    }

    handleValidation(): boolean {
        let formIsValid = true;

        this.errors = new RegisterErrors();

        const emailRe = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/i;
        if (!emailRe.test(this.registerDTO.email)) {
            this.errors.email.message = "Email is not valid!"
            formIsValid = false;
        }

        const passwordRe = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/i;
        if (!passwordRe.test(this.registerDTO.password)) {
            this.errors.password.message = "Password requirements: Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character:"
            formIsValid = false;
        }

        if (this.registerDTO.password !== this.confirmPassword) {
            this.errors.password.message = "Password and confirm password are not the same!";
            formIsValid = false;
        }

        if (!this.registerDTO.firstname) {
            this.errors.firstname.message = "Firstname field can not be empty!"
            formIsValid = false;
        }

        if (!this.registerDTO.lastname) {
            this.errors.lastname.message = "Lastname field can not be empty!"
            formIsValid = false;
        }

        return formIsValid;
    }

}
