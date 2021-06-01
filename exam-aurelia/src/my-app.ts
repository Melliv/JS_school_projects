import { AppState } from "./state/app-state";
import { IRouter } from 'aurelia-direct-router';

import { IdentityLogin } from "./views/identity/identity-login";
import { IdentityRegister } from "./views/identity/identity-register";
import { HomeIndex } from "./views/home/home-index";

import { BloodDonateIndex } from "./views/blood-donate/blood-donate-index";
import { BloodDonateDetails } from "./views/blood-donate/blood-donate-details";
import { BloodDonateCreate } from "./views/blood-donate/blood-donate-create";

import { SubjectIndex } from "./views/Subject/subject-index";
import { SubjectDetails } from "./views/Subject/subject-details";
import { SubjectCreate } from "./views/Subject/subject-create";

import { PersonSubjectIndex } from "./views/PersonSubject/personsubject-index";
import { PersonSubjectCreate } from "./views/PersonSubject/personsubject-create";
import { PersonSubjectDetails } from "./views/PersonSubject/personsubject-details";

import { HomeworkIndex } from "./views/Homework/homework-index";
import { HomeworkDetails } from "./views/Homework/homework-details";
import { HomeworkCreate } from "./views/Homework/homework-create";

import { PersonHomeworkIndex } from "./views/PersonHomework/personHomework-index";
import { PersonHomeworkCreate } from "./views/PersonHomework/personHomework-create";


export class MyApp {

    static routes = [
        { path: '', component: HomeIndex },
        { path: 'Home', component: HomeIndex },
        { path: 'Login', component: IdentityLogin },
        { path: 'register', component: IdentityRegister },

        { path: 'Subject', component: SubjectIndex },
        { path: 'Subject/:id', component: SubjectDetails },
        { path: 'Subject/Create', component: SubjectCreate },
        { path: 'Subject/Edit/:id', component: SubjectCreate },

        { path: 'PersonSubject', component: PersonSubjectIndex },
        { path: 'PersonSubject/:id', component: PersonSubjectDetails },
        { path: 'PersonSubject/Create/:id', component: PersonSubjectCreate },

        { path: 'Homework', component: HomeworkIndex },
        { path: 'Homework/:id', component: HomeworkDetails },
        { path: 'Homework/Create', component: HomeworkCreate },
        { path: 'Homework/Edit/:id', component: HomeworkCreate },

        { path: 'PersonHomework', component: PersonHomeworkIndex },
        /*  { path: 'Homework/:id', component: HomeworkDetails }, */
        { path: 'PersonHomework/Create', component: PersonHomeworkCreate },
/*        { path: 'Homework/Edit/:id', component: HomeworkCreate }, */
        
        { path: 'blooddonate', component: BloodDonateIndex },
        { path: 'blooddonate/:id', component: BloodDonateDetails },
        { path: 'blooddonate/create', component: BloodDonateCreate },
    ];
    
    constructor(
        @IRouter private router: IRouter,
        private state: AppState) {
    }
    
}
