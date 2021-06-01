import { BaseService } from '../../services/base-service';
import { HttpClient } from "aurelia";
import { AppState } from '../../state/app-state';
import { EPageStatus } from '../../types/EPageStatus';
import { PageLoader } from '../../types/PageLoader';
import { IRouter } from 'aurelia-direct-router';

import { PersonHomework } from '../../domain/DTO/PersonHomework';
import { AppUser } from '../../domain/DTO/AppUser';

import { PersonHomeworkErrors } from '../../domain/errors/PersonHomeworkErrors';
import { IFetchResponse } from '../../types/IFetchResponse';
import { Homework } from '../../domain/DTO/Homework';
import { Subject } from '../../domain/DTO/Subject';

export class PersonHomeworkCreate {
    errors: PersonHomeworkErrors = new PersonHomeworkErrors();
    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    personHomework: PersonHomework = new PersonHomework();
    persons: AppUser[] = [];
    homeworks: Homework[] = [];

    hasHomework: boolean = false;
    edit: boolean = false;
    id?: string;

    constructor(
        protected httpClient: HttpClient, 
        private appState: AppState, 
        @IRouter private router: IRouter,) {
    }

    async load(parameters: { id: string }) {
        if (parameters.id) {
            this.hasHomework = true;
/*             this.edit = true;
            this.id = parameters.id;
            const result = await BaseService.get<Subject>("Subject/" + parameters.id, this.appState.token);

            if (result.ok && result.data) {
                this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 };

                this.subject = result.data;
            } else {
                this.pageLoader = { pageStatus: EPageStatus.Error, statusCode: result.statusCode };
            } */
        }
        
    }

    async attached(): Promise<void> {
        if (this.appState.role != "Admin" && this.appState.role != "Teacher") {
            await this.router.load("/home");
        }

        const resultPer = await BaseService.getAll<AppUser>("/User", this.appState.token);
        const resultHom = await BaseService.getAll<Homework>("/Homework", this.appState.token);
        
        if (resultPer.ok && resultPer.data && 
            resultHom.ok && resultHom.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }

            this.persons = resultPer.data;
            this.homeworks = resultHom.data;
        } else {
            this.pageLoader = {
                pageStatus: EPageStatus.Error,
                statusCode: (resultPer.ok ? resultHom : resultPer).statusCode
            }
        }

    }

    async create(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        if (!this.handleValidation()) {
            return;
        }
        
        const response = (this.edit)
            ? await BaseService.put<PersonHomework>("PersonHomework/" + this.id, this.personHomework, this.appState.token)
            : await BaseService.post<PersonHomework>("PersonHomework", this.personHomework, this.appState.token);

        if (response.ok != null && response.messages != null) {
            this.errors.generalError.message = response.messages
        } else if (response.data != null) {
            await this.router.load("PersonHomework/" + ((this.id) ? this.id : response.data.id));
        }
    }

    handleValidation(): boolean {
        let formIsValid = true;

        this.errors = new PersonHomeworkErrors();

        if (!this.personHomework.grade) {
            this.errors.grade.message = "Grade value can not be empty!";
            formIsValid = false;
        }

        if (!this.personHomework.personId) {
            this.errors.person.message = "Student value can not be empty!";
            formIsValid = false;
        }

        if (!this.personHomework.homeworkId) {
            this.errors.homework.message = "Homework value can not be empty!";
            formIsValid = false;
        }

        return formIsValid;
    }

}