import { AppState } from "./state/app-state";
import { IRouter } from 'aurelia-direct-router';

import { HomeIndex } from "./views/home/home-index";
import { IdentityLogin } from "./views/identity/identity-login";

import { SubjectIndex } from "./views/Subject/subject-index";
import { SubjectCreate } from "./views/Subject/subject-create";
import { SubjectDetails } from "./views/Subject/subject-details";

import { PersonSubjectIndex } from "./views/PersonSubject/personsubject-index";
import { PersonSubjectCreate } from "./views/PersonSubject/personsubject-create";
import { PersonSubjectDetails } from "./views/PersonSubject/personsubject-details";

import { HomeworkIndex } from "./views/Homework/homework-index";
import { HomeworkCreate } from "./views/Homework/homework-create";
import { HomeworkDetails } from "./views/Homework/homework-details";

import { PersonHomeworkIndex } from "./views/PersonHomework/personhomework-index";
import { PersonHomeworkCreate } from "./views/PersonHomework/personhomework-create";
import { PersonHomeworkDetails } from "./views/PersonHomework/personhomework-details";

import { PersonIndex } from "./views/Person/person-index";



export class MyApp {

    static routes = [
        { path: '', component: HomeIndex },
        { path: 'Home', component: HomeIndex },
        { path: 'Login', component: IdentityLogin },

        { path: 'Subject', component: SubjectIndex },
        { path: 'Subject/:id', component: SubjectDetails },
        { path: 'Subject/Create', component: SubjectCreate },
        { path: 'Subject/Edit/:id', component: SubjectCreate },

        { path: 'PersonSubject', component: PersonSubjectIndex },
        { path: 'PersonSubject/:id', component: PersonSubjectDetails },
        { path: 'PersonSubject/Create/:id', component: PersonSubjectCreate },
        { path: 'PersonSubject/Edit/:id/:edit', component: PersonSubjectCreate },

        { path: 'Homework', component: HomeworkIndex },
        { path: 'Homework/:id', component: HomeworkDetails },
        { path: 'Homework/Create', component: HomeworkCreate },
        { path: 'Homework/Edit/:id', component: HomeworkCreate },

        { path: 'PersonHomework', component: PersonHomeworkIndex },
        { path: 'PersonHomework/:id', component: PersonHomeworkDetails },
        { path: 'PersonHomework/Create/:id?/:addStudent?', component: PersonHomeworkCreate },
        { path: 'PersonHomework/Edit/:id', component: PersonHomeworkCreate },

        { path: 'Person', component: PersonIndex },
    ];
    
    constructor(
        @IRouter private router: IRouter,
        private state: AppState) {
    }
    
}
