import { BaseService } from '../../services/base-service';
import { HttpClient, IRouteViewModel } from "aurelia";
import { AppState } from '../../state/app-state';
import { EPageStatus } from '../../types/EPageStatus';
import { PageLoader } from '../../types/PageLoader';
import { IRouter } from 'aurelia-direct-router';

import { PersonSubject } from '../../domain/DTO/PersonSubject';
import { PersonSubjectErrors } from '../../domain/errors/PersonSubjectErrors';
import { IFetchResponse } from '../../types/IFetchResponse';
import { AppUser } from '../../domain/DTO/AppUser';
import { Subject } from '../../domain/DTO/Subject';

export class PersonSubjectCreate {
    errors: PersonSubjectErrors = new PersonSubjectErrors();
    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    personSubject: PersonSubject = new PersonSubject();
    subjects: Subject[] = [];

    register: boolean = false;
    edit: boolean = false;
    id?: string;

    constructor(
        protected httpClient: HttpClient, 
        private appState: AppState, 
        @IRouter private router: IRouter,) {
    }

    async load(parameters: { id: string, edit: boolean }) {
        if (this.appState.role == "") {
            await this.router.load("/home");
        }

        if (parameters.edit) {
            this.edit = true;
            this.id = parameters.id;
            const result = await BaseService.get<PersonSubject>("/PersonSubject/" + parameters.id, this.appState.token);

            if (result.ok && result.data) {
                this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }
                
                this.personSubject = result.data;
            } else {
                this.pageLoader = {
                    pageStatus: EPageStatus.Error,
                    statusCode: result.statusCode
                }
            }
            return
        }
        
        console.log("test 111");
        
        if (parameters.id) {
            this.register = true;
            const result = await BaseService.get<PersonSubject>("PersonSubject/registerStudent/" + parameters.id, this.appState.token);

            if (result.ok && result.data) {
                await this.router.load("/PersonSubject/" + result.data.id);
            } else {
                this.pageLoader = {
                    pageStatus: EPageStatus.Error,
                    statusCode: result.statusCode,
                    message: result.messages
                };
            }
        }
    }

    async attached(): Promise<void> {
        const result = await BaseService.getAll<Subject>("/Subject", this.appState.token);

        if (result.ok && result.data) {
            //this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }

            this.subjects = result.data;
        } /* else {
            this.pageLoader = {
                pageStatus: EPageStatus.Error,
                statusCode: result.statusCode
            }
        } */

    }

    async create(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        if (!this.handleValidation()) {
            return;
        }
        
        const response = (this.edit)
            ? await BaseService.put<PersonSubject>("PersonSubject/" + this.id, this.personSubject, this.appState.token)
            : await BaseService.post<PersonSubject>("PersonSubject", this.personSubject, this.appState.token);

        if (response.ok != null && response.messages != null) {
            this.errors.generalError.message = response.messages
        } else if (response.data != null) {
            await this.router.load("PersonSubject/" + ((this.id) ? this.id : response.data.id));
        }
    }

    handleValidation(): boolean {
        let formIsValid = true;

        this.errors = new PersonSubjectErrors();

        if (!this.personSubject.subjectId) {
            this.errors.subject.message = "Subject can not be empty!";
            formIsValid = false;
        }

        return formIsValid;
    }
}
