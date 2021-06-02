import { ILoginResponse } from "../types/ILoginResponse";


export class AppState {
    token: string = "";
    firstname: string = "";
    lastname: string = "";
    role: string = "";
    
    logIn(loginResponse: ILoginResponse) {
        this.token = loginResponse.token;
        this.firstname = loginResponse.firstname;
        this.lastname = loginResponse.lastname;
        this.role = loginResponse.role;
    }

    logOut() {
        this.token = "";
        this.firstname = "";
        this.lastname = "";
        this.role = "";
    }
}