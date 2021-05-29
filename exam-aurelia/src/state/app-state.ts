import { ILoginResponse } from "../types/ILoginResponse";

export class AppState {
    token: string | null = null;
    firstname: string = "";
    lastname: string = "";
    
    logIn(loginResponse: ILoginResponse) {
        this.token = loginResponse.token;
        this.firstname = loginResponse.firstname;
        this.lastname = loginResponse.lastname;
    }

    logOut() {
        this.token = null;
        this.firstname = "";
        this.lastname = "";
    }
}