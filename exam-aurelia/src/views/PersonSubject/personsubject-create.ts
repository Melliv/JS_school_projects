import { BaseService } from '../../services/base-service';
import { HttpClient } from "aurelia";
import { AppState } from '../../state/app-state';
import { EPageStatus } from '../../types/EPageStatus';
import { PageLoader } from '../../types/PageLoader';
import { IRouter } from 'aurelia-direct-router';

import { PersonSubject } from '../../domain/DTO/PersonSubject';
import { Person } from '../../domain/Person';
import { SubjectErrors } from '../../domain/errors/SubjectErrors';
import { IFetchResponse } from '../../types/IFetchResponse';

export class PersonSubjectCreate {
    errors: SubjectErrors = new SubjectErrors();
    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    subject: PersonSubject = new PersonSubject();
    persons: Person[] = [];

    edit: boolean = false;
    id?: string;

    constructor(protected httpClient: HttpClient, private appState: AppState, @IRouter private router: IRouter,) {
    }

    async load(parameters: { id: string }) {
        if (parameters.id) {
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
}
