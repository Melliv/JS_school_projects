import { BaseService } from '../../services/base-service';
import { HttpClient, IRouteViewModel } from "aurelia";
import { AppState } from '../../state/app-state';
import { EPageStatus } from '../../types/EPageStatus';
import { PageLoader } from '../../types/PageLoader';
import { IRouter } from "aurelia-direct-router";

import { Homework } from '../../domain/DTO/Homework';

export class HomeworkIndex implements IRouteViewModel {
    private homeworks: Homework[] = [];

    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    constructor(
        @IRouter private router: IRouter,
        protected httpClient: HttpClient, 
        private appState: AppState){
    }

    async attached() {
        const result = await BaseService.getAll<Homework>("/Homework", this.appState.token);

        if (result.ok && result.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 };

            this.homeworks = result.data;
        } else {
            this.pageLoader = { pageStatus: EPageStatus.Error, statusCode: result.statusCode };
        }

    }

    async delete(event: Event, id: string) {
        event.preventDefault();
        event.stopPropagation();
        
        const result = await BaseService.delete<Homework>("/Homework/" + id, this.appState.token);
        if (result.ok) {
            await this.attached();
        } else {
            this.pageLoader = { 
                pageStatus: EPageStatus.CantDelete, 
                statusCode: result.statusCode, 
                message: result.messages };
        }
    }
}