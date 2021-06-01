import { BaseService } from '../../services/base-service';
import { HttpClient } from "aurelia";
import { AppState } from '../../state/app-state';
import { EPageStatus } from '../../types/EPageStatus';
import { PageLoader } from '../../types/PageLoader';
import { IRouter } from 'aurelia-direct-router';

import { Subject } from '../../domain/DTO/Subject';
import { Person } from '../../domain/Person';
import { SubjectErrors } from '../../domain/errors/SubjectErrors';
import { IFetchResponse } from '../../types/IFetchResponse';

export class SubjectCreate {
    errors: SubjectErrors = new SubjectErrors();
    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    subject: Subject = new Subject();
    persons: Person[] = [];

    edit: boolean = false;
    id?: string;

    constructor(
        protected httpClient: HttpClient, 
        private appState: AppState, 
        @IRouter private router: IRouter,) {
    }

    async load(parameters: { id: string }) {
        if (parameters.id) {
            this.edit = true;
            this.id = parameters.id;
            const result = await BaseService.get<Subject>("Subject/" + parameters.id, this.appState.token);

            if (result.ok && result.data) {
                this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 };

                this.subject = result.data;
            } else {
                this.pageLoader = { pageStatus: EPageStatus.Error, statusCode: result.statusCode };
            }
        }
        
    }

    async attached(): Promise<void> {
        if (this.appState.role != "Admin") {
            await this.router.load("/home");
        }

        const result = await BaseService.getAll<Person>("/User/role=Teacher", this.appState.token);

        if (result.ok && result.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }

            this.persons = result.data;
        } else {
            this.pageLoader = {
                pageStatus: EPageStatus.Error,
                statusCode: result.statusCode
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
            ? await BaseService.put<Subject>("Subject/" + this.id, this.subject, this.appState.token)
            : await BaseService.post<Subject>("Subject", this.subject, this.appState.token);

        if (response.ok != null && response.messages != null) {
            this.errors.generalError.message = response.messages
        } else if (response.data != null) {
            await this.router.load("Subject/" + ((this.id) ? this.id : response.data.id));
        }
    }

    handleValidation(): boolean {
        let formIsValid = true;

        this.errors = new SubjectErrors();

        if (!this.subject.name) {
            this.errors.name.message = "Subject name can not be empty!";
            formIsValid = false;
        }

        if (!this.subject.personId) {
            this.errors.person.message = "Teacher value can not be empty!";
            formIsValid = false;
        }

        return formIsValid;
    }

}