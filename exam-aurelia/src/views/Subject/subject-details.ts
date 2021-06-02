import { BaseService } from '../../services/base-service';
import { HttpClient, IRouteViewModel } from "aurelia";
import { AppState } from '../../state/app-state';
import { EPageStatus } from '../../types/EPageStatus';
import { PageLoader } from '../../types/PageLoader';
import { IRouter } from "aurelia-direct-router";

import { Subject } from '../../domain/DTO/Subject';
import { Statistics } from '../../domain/DTO/Statistics';

export class SubjectDetails implements IRouteViewModel {
    subject?: Subject;
    subjectStat?: string;

    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    constructor(
        @IRouter private router: IRouter,
        protected httpClient: HttpClient, 
        private appState: AppState){
           //const googleChartsNode: any = require('google-charts-node');
    }

    async load(parameters: { id: string}){
        const result = await BaseService.get<Subject>("/Subject/" + parameters.id, this.appState.token);
        //const resultStat = await BaseService.get<Statistics>("/Subject/Statistics/" + parameters.id, this.appState.token);

        if (result.ok && result.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 };

            this.subject = result.data;
            //this.subjectStat = resultStat.data.data;
            //console.log(this.subjectStat);
        } else {
            this.pageLoader = { pageStatus: EPageStatus.Error, statusCode: result.statusCode };
        }

    }
}