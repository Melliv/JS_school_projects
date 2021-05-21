import { AppState } from "./state/app-state";
import { IRouter } from 'aurelia-direct-router';

import { BloodTransfusionIndex } from "./views/blood-transfusion/blood-transfusion-index";
import { BloodDonateIndex } from "./views/blood-donate/blood-donate-index";
import { BloodDonateDetails } from "./views/blood-donate/blood-donate-details";
import { BloodDonateCreate } from "./views/blood-donate/blood-donate-create";

import { IdentityLogin } from "./views/identity/identity-login";
import { HomeIndex } from "./views/home/home-index";
import { PersonIndex } from "./views/person/person-index";

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
            path: 'bloodtransfusion',
            component: BloodTransfusionIndex
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
        this.state.token = null;
        this.state.firstname = null;
        this.state.lastname = null;

        await this.router.load('login');
      }

}
