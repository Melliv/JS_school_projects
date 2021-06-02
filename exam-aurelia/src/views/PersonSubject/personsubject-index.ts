import { BaseService } from '../../services/base-service';
import { HttpClient } from "aurelia";
import { AppState } from '../../state/app-state';
import { EPageStatus } from '../../types/EPageStatus';
import { PageLoader } from '../../types/PageLoader';
import { IRouter } from "aurelia-direct-router";

import { PersonSubject } from '../../domain/DTO/PersonSubject';

export class PersonSubjectIndex {
    private personSubjects: PersonSubject[] = [];

    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    constructor(
        @IRouter private router: IRouter,
        protected httpClient: HttpClient,
        private appState: AppState) {
    }

    async attached() {
        if (this.appState.role == "") {
            await this.router.load("/home");
        }

        const result = await BaseService.getAll<PersonSubject>("/PersonSubject", this.appState.token);

        if (result.ok && result.data) {

            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 };

            this.personSubjects = result.data;
        } else {
            this.pageLoader = { pageStatus: EPageStatus.Error, statusCode: result.statusCode };
        }

    }

    async delete(event: Event, id: string) {
        event.preventDefault();
        event.stopPropagation();

        const result = await BaseService.delete<PersonSubject>("/PersonSubject/" + id, this.appState.token);
        if (result.ok) {
            await this.attached();
        } else {
            this.pageLoader = { pageStatus: EPageStatus.CantDelete, statusCode: result.statusCode };
        }
    }
}