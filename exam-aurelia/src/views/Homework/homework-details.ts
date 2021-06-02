import { BaseService } from '../../services/base-service';
import { HttpClient, IRouteViewModel } from "aurelia";
import { AppState } from '../../state/app-state';
import { EPageStatus } from '../../types/EPageStatus';
import { PageLoader } from '../../types/PageLoader';
import { IRouter } from "aurelia-direct-router";

import { Homework } from '../../domain/DTO/Homework';

export class HomeworkDetails implements IRouteViewModel {
    homework?: Homework;

    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    constructor(
        @IRouter private router: IRouter,
        protected httpClient: HttpClient, 
        private appState: AppState){
    }

    async load(parameters: { id: string}){
        if (this.appState.role == "") {
            await this.router.load("/home");
        }

        const result = await BaseService.get<Homework>("/Homework/" + parameters.id, this.appState.token);

        if (result.ok && result.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 };

            this.homework = result.data;
        } else {
            this.pageLoader = { pageStatus: EPageStatus.Error, statusCode: result.statusCode };
        }

    }
}