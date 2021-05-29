import { AppState } from "./state/app-state";
import { IRouter } from 'aurelia-direct-router';

import { IdentityLogin } from "./views/identity/identity-login";
import { IdentityRegister } from "./views/identity/identity-register";
import { HomeIndex } from "./views/home/home-index";

import { BloodDonateIndex } from "./views/blood-donate/blood-donate-index";
import { BloodDonateDetails } from "./views/blood-donate/blood-donate-details";
import { BloodDonateCreate } from "./views/blood-donate/blood-donate-create";

export class MyApp {

    static routes = [
        {
            path: 'home',
            component: HomeIndex
        },
        {
            path: 'login',
            component: IdentityLogin
        },
        {
            path: 'register',
            component: IdentityRegister
        },
        {
            path: 'blooddonate',
            component: BloodDonateIndex
        },
        {
            path: 'blooddonate/:id',
            component: BloodDonateDetails
        },
        {
            path: 'blooddonate/create',
            component: BloodDonateCreate
        },
    ];
    
    constructor(
        @IRouter private router: IRouter,
        private state: AppState) {
    }

    async logOut() {
        this.state.logOut();
        await this.router.load('login');
    }

}
