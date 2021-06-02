import { BaseService } from '../../services/base-service';
import { HttpClient } from "aurelia";
import { AppState } from '../../state/app-state';
import { EPageStatus } from '../../types/EPageStatus';
import { PageLoader } from '../../types/PageLoader';
import { IRouter } from "aurelia-direct-router";

import { AppUser } from '../../domain/DTO/AppUser';

export class PersonIndex {
    private persons: AppUser[] = [];

    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    constructor(
        @IRouter private router: IRouter,
        protected httpClient: HttpClient, 
        private appState: AppState){
    }

    async attached() {
        const result = await BaseService.getAll<AppUser>("/User", this.appState.token);

        if (result.ok && result.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 };

            this.persons = result.data;
        } else {
            this.pageLoader = { pageStatus: EPageStatus.Error, statusCode: result.statusCode };
        }

    }

}